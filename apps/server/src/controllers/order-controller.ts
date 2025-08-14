import { CreateOrderSchema, UpdateOrderSchema } from "@monorepo/types";
import { Orders } from "../models/order-model";
import type { Request, Response } from "express";

declare module "express" {
  interface UserAuth {
    user?: {
      id?: string;
    };
  }

  interface Request {
    auth?: UserAuth;
  }
}

export const createOrder = async (req: Request, res: Response) => {
  const result = CreateOrderSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ erorr: result.error.flatten() });
  }

  try {
    const userId = req.auth?.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    let order = await Orders.findOne({
      userId,
      productId: result.data.productId,
    });
    if (order) {
      order.quantity += result.data.quantity;
      await order.save();
      return res.status(202).json({
        userId,
        productId: result.data.productId,
      });
    } else {
      const newOrder = await Orders.create(result.data);
      await newOrder.save();
      res.status(201).json(newOrder);
    }
  } catch (error) {
    console.error("❌ Create Order Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const order = await Orders.find({ userId });
    res.status(200).json(order);
  } catch (error) {
    console.error("❌ Featch Orders Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const userId = req.auth?.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const order = await Orders.findOne({ _id: id, userId });
    if (!order) return res.json(404).json({ erorr: "Order not found" });

    res.status(200).json(order);
  } catch (error) {
    console.error("❌ Featch Order Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = UpdateOrderSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.flatten() });
  }

  try {
    const userId = req.auth?.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const update = await Orders.findByIdAndUpdate(
      { _id: id, userId },
      result.data,
      {
        new: true,
      }
    );
    if (!update) return res.status(404).json({ error: "Order not found" });

    res.status(204).json(update);
  } catch (error) {
    console.error("❌ Update Order Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const userId = req.auth?.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const deleted = await Orders.findByIdAndDelete({ _id: id, userId });
    if (!deleted) res.status(404).json({ error: "Order not found" });

    res
      .status(204)
      .json({ message: "The oreder has been successfully deleted." });
  } catch (error) {
    console.error("❌ Delete Order Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
