import { Router } from "express";
import { ai, EXTRA_HEADERS, MODEL } from "../config/openrouter";
import { toolImpl, toolsSpec } from "../services/ai-services";

const router = Router();

/** Simple system prompt to keep the agent on-brand and safe */
const SYSTEM = `
أنت Gears AI، مختص في بيع قطع السيارات. دائماً:
- اطلب معلومات السيارة لتوضيح الاستفسار (رقم الشاصي أو الماركة/الموديل/السنة/نوع المحرك) قبل اقتراح أي قطعة.
- فضّل القطع المتوفرة في المخزون وأظهر السعر ولماذا تناسب السيارة.
- إذا لم تكن متأكدًا، اسأل أولاً قبل الافتراض.
- اجعل الإجابات مختصرة وواضحة مع نقاط مرقمة أو نقاط رصاصية، وفي النهاية أضف خطوة موصى بها.
- استخدم اللغة العربية الفصحى مع أسلوب ودّي وسهل الفهم.
`;

router.post("/", async (req, res) => {
  const { messages } = req.body; // [{role:'user'|'assistant'|'tool'|'system', content, ...}]
  res.setHeader("Content-Type", "text/event-stream"); // simple stream

  // 1) First call with tools available
  const first = await ai.chat.completions.create(
    {
      model: MODEL,
      messages: [{ role: "system", content: SYSTEM }, ...messages],
      tools: toolsSpec as any,
      stream: true, // stream tokens
    },
    { headers: EXTRA_HEADERS }
  );

  // Stream tokens and collect any tool calls if present
  let pendingToolCalls: any[] = [];
  for await (const chunk of first as any) {
    // Forward tokens to client
    if (chunk.choices?.[0]?.delta?.content) {
      res.write(
        `data: ${JSON.stringify({ type: "token", data: chunk.choices[0].delta.content })}\n\n`
      );
    }
    // Capture tool calls (finish_reason === 'tool_calls' in final frame)
    if (chunk.choices?.[0]?.delta?.tool_calls) {
      pendingToolCalls.push(...chunk.choices[0].delta.tool_calls);
    }
  }

  // If no tool calls, end stream
  if (!pendingToolCalls.length) {
    res.write(`data: ${JSON.stringify({ type: "done" })}\n\n`);
    return res.end();
  }

  // 2) Execute tools locally, append as messages, then call model again
  const toolMessages: any[] = [];
  for (const tc of pendingToolCalls) {
    const name = tc.function?.name as keyof typeof toolImpl;
    const args = JSON.parse(tc.function?.arguments || "{}");
    const result = await toolImpl[name](args);
    toolMessages.push({
      role: "tool",
      tool_call_id: tc.id,
      name,
      content: JSON.stringify(result),
    });
  }

  const second = await ai.chat.completions.create(
    {
      model: MODEL,
      messages: [
        { role: "system", content: SYSTEM },
        ...messages,
        // IMPORTANT: include the assistant tool_call message frame that triggered tools
        {
          role: "assistant",
          content: null as any,
          tool_calls: pendingToolCalls,
        },
        ...toolMessages,
      ],
      tools: toolsSpec as any, // must include tools again for validation
      stream: true,
    },
    { headers: EXTRA_HEADERS }
  );

  for await (const chunk of second as any) {
    if (chunk.choices?.[0]?.delta?.content) {
      res.write(
        `data: ${JSON.stringify({ type: "token", data: chunk.choices[0].delta.content })}\n\n`
      );
    }
  }
  res.write(`data: ${JSON.stringify({ type: "done" })}\n\n`);
  res.end();
});

export default router;
