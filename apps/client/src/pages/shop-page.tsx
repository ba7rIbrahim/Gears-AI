import { useState } from "react";
import type { Product } from "@monorepo/types";
import {
  BreadcrumbInit,
  NotFoundProduct,
  ProductCardSkeleton,
} from "@/components/shared";
import { MobileHeader } from "@/components/shared/skeletons/mobile-header";
import {
  DesktopSidebarFilter,
  HeroBanner,
  ProductCard,
  ProductsHeader,
} from "@/components/sections/shop";
import { useGetProducts } from "@/hooks/use-products";

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  sortBy: string;
}

const ShopPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 500],
    sortBy: "name",
  });
  const { data: products, isPending } = useGetProducts();

  const filteredProducts = products?.filter((product: Product) => {
    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(product.category);
    const matchesPrice = product.oldPrice <= filters.priceRange[1];
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesPrice && matchesSearch;
  });

  const sortedProducts = [...(filteredProducts ?? [])].sort((a, b) => {
    switch (filters.sortBy) {
      case "price-low":
        return a.oldPrice - b.oldPrice;
      case "price-high":
        return b.oldPrice - a.oldPrice;
      case "rating":
        return b.oldPrice - a.oldPrice;
      default:
        return a.title.localeCompare(b.title);
    }
  });

  return (
    <div className="container">
      <BreadcrumbInit
        items={[{ label: "الملف الشخصي", isCurrentPage: true }]}
      />
      <HeroBanner />
      <div className="min-h-screen bg-background text-foreground">
        <div className="flex">
          <DesktopSidebarFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filters={filters}
            setFilters={setFilters}
          />

          <div className="flex-1 ">
            <MobileHeader
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filters={filters}
              setFilters={setFilters}
            />

            <ProductsHeader
              filters={filters}
              setFilters={setFilters}
              sortedProducts={sortedProducts}
            />

            {/* Products Grid & Skeleton Product Grid*/}
            <div className="py-6 lg:p-6">
              {isPending && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))}
                </div>
              )}

              {!isPending && sortedProducts.length === 0 && (
                <NotFoundProduct
                  title="لم يتم العثور على منتجات"
                  description="جرب تغيير الفلاتر أو البحث عن شيء آخر"
                />
              )}

              {sortedProducts.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sortedProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
