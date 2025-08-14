import mongoose from "mongoose";
import { ENV } from "./env";
let isConnected = false;

const MONGO_URI = ENV.MONGODB_URI;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};
