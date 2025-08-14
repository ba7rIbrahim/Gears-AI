import express from "express";
import cors from "cors";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { connectDB } from "./config/database";
import OpenAI from "openai";
import productRouter from "./routes/product-route";
import orderRoute from "./routes/order-route";
import cookieParser from "cookie-parser";
import { ENV } from "./config/env";
import AIRouter from "./routes/ai-route";

const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: ENV.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use(express.json());
app.use("/api/products", productRouter);
app.use("/api/orders", orderRoute);
app.use("/api/ai/chat", AIRouter);

app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  res.json(session);
});

connectDB()
  .then(() => {
    app.listen(ENV.PORT, () => {
      console.log(`🚀 Server running on PORT:${ENV.PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB", err);
  });
