import { productServices } from "@/services/product-services";
import type { CreateProductInput } from "@monorepo/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateProductInput) =>
      productServices.createProduct(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: productServices.getAllProducts,
  });
};

export const useGetProduct = (id: string) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => productServices.getProduct(id),
    enabled: !!id,
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => productServices.deleteProduct(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
