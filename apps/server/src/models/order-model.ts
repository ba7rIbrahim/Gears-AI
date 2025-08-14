import mongoose, { Schema } from "mongoose";

const CartItemSchema = new Schema(
  {
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    title: { type: String, require: true },
    image: { type: String, require: true },
    oldPrice: { type: Number },
    newPrice: { type: Number, default: 0 },
    inStock: { type: Number, default: 0 },
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export const Orders = mongoose.model("Order", CartItemSchema);
