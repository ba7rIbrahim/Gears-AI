import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { ENV } from "../config/env";

const client = new MongoClient(ENV.MONGODB_URI);
await client.connect();

const db = client.db("test");

export const auth = betterAuth({
  advanced: {
    defaultCookieAttributes: {
      sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
      secure: ENV.NODE_ENV === "production",
    },
  },
  database: mongodbAdapter(db),
  secret: ENV.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
  },
  email: {
    sendVerification: true,
    sendPasswordReset: true,
  },
  trustedOrigins: ["https://gears-ai.vercel.app", "http://localhost:5173"],
  baseURL: ENV.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      clientId: ENV.GOOGLE_CLIENT_ID,
      clientSecret: ENV.GOOGLE_CLIENT_SECRET,
    },
  },
});
