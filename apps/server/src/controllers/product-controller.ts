import { CreateProductSchema, UpdateProductSchema } from "@monorepo/types";
import type { Request, Response } from "express";
import { Product } from "../models/product-model";

export const createProduct = async (req: Request, res: Response) => {
  const result = CreateProductSchema.safeParse(req.body);
  if (!result.success)
    return res.status(400).json({ error: result.error.flatten() });

  try {
    const product = await Product.create({ ...result.data });
    res.status(201).json(product);
  } catch (error) {
    console.error("❌ Create Product Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Fetch Products Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("❌ Fetch Product Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = UpdateProductSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.flatten() });
  }

  try {
    const updated = await Product.findByIdAndUpdate(id, result.data, {
      new: true,
    });

    if (!updated) return res.status(404).json({ error: "Product not found" });
    res.status(204).json(updated);
  } catch (error) {
    console.error("❌ Update Products Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Product not found" });
    res
      .status(204)
      .json({ message: "The product has been successfully deleted." });
  } catch (error) {
    console.error("❌ Delete Products Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
