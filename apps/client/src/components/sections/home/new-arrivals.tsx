import {
  NotFoundProduct,
  ProductCardSkeleton,
  SectionTitle,
} from "@/components/shared";
import { ProductCard } from "../shop";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@monorepo/types";
import axios from "axios";

export const NewArrivals = () => {
  const { data: products, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products`
      );
      return res.data;
    },
  });

  const newArrivals = products
    ?.filter((product: Product) => !product.isRecentlyAdded)
    .slice(0, 10);

  return (
    <section className="container">
      <SectionTitle>أحدث المنتجات</SectionTitle>
      <div className="relative">
        {!isPending && newArrivals?.length === 0 && (
          <NotFoundProduct title="لا توجد منتجات جديدة حالياً" />
        )}
        <div className="flex overflow-x-scroll gap-4 pb-6 mt-6">
          {isPending
            ? Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="min-w-[250px]">
                  <ProductCardSkeleton />
                </div>
              ))
            : newArrivals?.map((product: Product) => (
                <div key={product._id} className="min-w-[250px]">
                  <ProductCard product={product} />
                </div>
              ))}
        </div>
        <div className="absolute inset-y-0 top-0 left-0 z-20 w-12 h-full bg-gradient-to-r to-transparent transition-opacity duration-200 pointer-events-none from-background"></div>
      </div>
    </section>
  );
};
