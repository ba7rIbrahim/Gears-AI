import { z } from "zod";

export const categories = ["بطاريات", "إطارات", "زيوت", "أكسسوارات"] as const;

export const ProductSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(2).max(100),
  description: z.string().min(10),
  category: z.enum(categories),
  oldPrice: z.number().nonnegative(),
  newPrice: z.number().nonnegative().optional(),
  inStock: z.number().int().nonnegative(),
  material: z.string().optional(),
  careInstruction: z.string().optional(),
  warranty: z.string().optional(),
  image: z.string().url(),
  isWishlisted: z.boolean().optional(),
  isRecentlyAdded: z.boolean().optional(),
});

export type Product = z.infer<typeof ProductSchema>;
export type Category = (typeof categories)[number];

export const CreateProductSchema = ProductSchema.omit({ _id: true });
export type CreateProductInput = z.infer<typeof CreateProductSchema>;

export const UpdateProductSchema = ProductSchema.partial().omit({ _id: true });
export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;

// ================== Orders Schema Type ==================
export const OrderSchema = z.object({
  _id: z.string().optional(),
  userId: z.string().nonempty("userId is required"),
  productId: z.string().nonempty("productId is required"),
  title: z.string().nonempty("order name is required"),
  image: z.string().nonempty("order image is required"),
  oldPrice: z.number().nonnegative(),
  newPrice: z.number().nonnegative().optional().default(0),
  inStock: z.number().int().positive().optional(),
  quantity: z.number().int().positive(),
});

export type Order = z.infer<typeof OrderSchema>;

export const CreateOrderSchema = OrderSchema.omit({
  _id: true,
});
export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;

export const UpdateOrderSchema = OrderSchema.partial().passthrough();
export type UpdateOrderInput = z.infer<typeof UpdateOrderSchema>;
