import { axiosAPI } from "@/lib/axios";
import type { CreateProductInput } from "@monorepo/types";

export const productServices = {
  createProduct: async (payload: CreateProductInput) => {
    const { data } = await axiosAPI.post("/products", { payload });
    return data;
  },

  getAllProducts: async () => {
    const { data } = await axiosAPI.get("/products");
    return data;
  },

  getProduct: async (id: string) => {
    const { data } = await axiosAPI.get(`/products/${id}`);
    return data;
  },

  updateProduct: async (id: string) => {
    const { data } = await axiosAPI.put(`/products/${id}`);
    return data;
  },

  deleteProduct: async (id: string) => {
    const { data } = await axiosAPI.delete(`/products/${id}`);
    return data;
  },
};
