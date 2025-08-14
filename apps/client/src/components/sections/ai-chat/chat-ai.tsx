import { useState } from "react";
import { useSession } from "@/lib/auth";
import { Bot, CornerDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
  ChatInput,
  ChatMessageList,
  ExpandableChat,
  ExpandableChatBody,
  ExpandableChatFooter,
  ExpandableChatHeader,
} from "./components";

export type Msg = {
  role: "user" | "assistant";
  content: string;
  variant?: "sent" | "received";
  id?: string;
  timestamp?: number;
};

export const ChatAI = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content: "مرحباً! 👋 كيف أقدر أساعدك في إيجاد القطعة المناسبة لسيارتك؟",
    },
  ]);

  async function send() {
    setIsLoading(true);
    if (input === "") return;
    setInput("");

    const newMessages: Msg[] = [...messages, { role: "user", content: input }];
    setMessages(newMessages);

    const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/ai/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const reader = resp.body!.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const text = decoder.decode(value);
      text.split("\n\n").forEach((line) => {
        if (!line.startsWith("data:")) return;
        const evt = JSON.parse(line.slice(5));
        if (evt.type === "token") {
          setMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last?.role === "assistant") {
              return [
                ...prev.slice(0, -1),
                { role: "assistant", content: last.content + evt.data },
              ];
            }
            return [...prev, { role: "assistant", content: evt.data }];
          });
        }
      });
    }
    setIsLoading(false);
  }

  return (
    <ExpandableChat
      size="lg"
      position="bottom-right"
      icon={<Bot className="h-6 w-6" />}
    >
      <ExpandableChatHeader className="flex-col gap-y-2 text-center justify-center">
        <h1 className="text-xl font-semibold"> مساعد قطع السيارات الذكي</h1>
        <p className="text-sm text-muted-foreground">
          أدخل بيانات سيارتك وسنساعدك في العثور على القطعة المناسبة
        </p>
      </ExpandableChatHeader>

      <ExpandableChatBody>
        <ChatMessageList>
          {messages.map((message, index) => (
            <ChatBubble
              key={index}
              variant={message.role === "user" ? "sent" : "received"}
            >
              <ChatBubbleAvatar
                className="h-8 w-8 shrink-0 text-right"
                src={
                  message.role === "user"
                    ? (session?.user.image ??
                      "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yeXhhbDRoaHhMM0huTmRXQktaa2VWaU5rMHoiLCJyaWQiOiJ1c2VyXzMwT3RUS29YM0VBaUhFc0RZWnRxYTQ1MG5laSJ9")
                    : "https://cdn-icons-png.flaticon.com/512/13330/13330989.png"
                }
                fallback={message.role === "user" ? "user" : "received"}
              />
              <ChatBubbleMessage
                variant={message.role === "user" ? "sent" : "received"}
                className="text-right"
              >
                {message.content}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}

          {isLoading && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar
                className="h-8 w-8 shrink-0"
                src="https://cdn-icons-png.flaticon.com/512/13330/13330989.png"
                fallback="AI"
              />
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          )}
        </ChatMessageList>
      </ExpandableChatBody>

      <ExpandableChatFooter>
        <div className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1">
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اكتب نوع السيارة، الموديل، وسنة الصنع..."
            className="min-h-12 resize-none rounded-lg  border-0 p-3 shadow-none focus-visible:ring-0"
          />
          <div className="text-left">
            <Button onClick={send} size="sm" className="gap-1.5">
              إرسال
              <CornerDownRight className="size-3.5" />
            </Button>
          </div>
        </div>
      </ExpandableChatFooter>
    </ExpandableChat>
  );
};
