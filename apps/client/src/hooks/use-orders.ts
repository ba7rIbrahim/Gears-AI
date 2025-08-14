import { orderServices } from "@/services/order-services";
import type { CreateOrderInput } from "@monorepo/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateOrderInput) =>
      orderServices.createOrder(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("تمت إضافة المنتج الى السلة");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء إضافة المنتج الى السلة");
    },
  });
};

export const useGetOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: orderServices.getAllOrders,
  });
};

export const useGetOrder = (id: string) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => orderServices.getOrder(id),
    enabled: !!id,
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      quantity,
    }: {
      id: string;
      quantity: number;
      action?: "plus" | "minus";
    }) => orderServices.updateOrder(id, quantity),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => orderServices.deleteOrder(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("تم حذف المنتج من السلة");
    },
  });
};
