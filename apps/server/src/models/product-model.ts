import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    category: {
      type: String,
      enum: ["بطاريات", "إطارات", "زيوت", "أكسسوارات"],
    },
    oldPrice: { type: Number },
    newPrice: { type: Number, default: 0 },
    inStock: { type: Number },
    material: { type: String },
    careInstruction: { type: String },
    warranty: { type: String },
    image: { type: String },
    isWishlisted: { type: Boolean, default: false },
    isRecentlyAdded: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
