import { axiosAPI } from "@/lib/axios";
import type { CreateOrderInput } from "@monorepo/types";

export const orderServices = {
  createOrder: async (payload: CreateOrderInput) => {
    const { data } = await axiosAPI.post("/orders", payload);
    return data;
  },

  getAllOrders: async () => {
    const { data } = await axiosAPI.get("/orders");
    return data;
  },

  getOrder: async (id: string) => {
    const { data } = await axiosAPI.get(`/orders/${id}`);
    return data;
  },

  updateOrder: async (id: string, quantity: number) => {
    const { data } = await axiosAPI.put(`/orders/${id}`, { quantity });
    return data;
  },

  deleteOrder: async (id: string) => {
    const { data } = await axiosAPI.delete(`/orders/${id}`);
    return data;
  },
};
