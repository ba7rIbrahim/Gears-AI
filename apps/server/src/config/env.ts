import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: path.resolve(
    process.cwd(),
    `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ""}`
  ),
});


export const ENV = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: process.env.PORT ?? "3000",
  MONGODB_URI: process.env.MONGODB_URI ?? "",
  BACKEND_URL: process.env.BACKEND_URL ?? "",
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL ?? "",
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET ?? "",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? "",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL ?? "",
  ADMIN_SECRET: process.env.ADMIN_SECRET ?? "",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? "",
  FRONTEND_URL: process.env.FRONTEND_URL ?? "",
  OPENROUTER_MODEL: process.env.OPENROUTER_MODEL ?? "",
  OPENROUTER_BASE_URL: process.env.OPENROUTER_BASE_URL ?? "",
  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY ?? "",
};
