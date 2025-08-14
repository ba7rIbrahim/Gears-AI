import OpenAI from "openai";
import { ENV } from "./env";

export const ai = new OpenAI({
  apiKey: ENV.OPENROUTER_API_KEY!,
  baseURL: ENV.OPENROUTER_BASE_URL,
});
export const MODEL = ENV.OPENROUTER_MODEL;
export const EXTRA_HEADERS = {
  "HTTP-Referer": ENV.BACKEND_URL,
  "X-Title": "AI-Agent-Car-Parts-Store",
};
