import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FilterState } from "@/pages/shop-page";
import type { Product } from "@monorepo/types";

export const ProductsHeader = ({
  sortedProducts,
  filters,
  setFilters,
}: {
  sortedProducts: Product[];
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}) => {
  const handleSortChange = (value: string) => {
    // setFilters((prev) => ({ ...prev, sortBy: value }));
    setFilters({ ...filters, sortBy: value });
  };
  return (
    <div className="p-4 lg:p-6 border-b border-border bg-card  rounded-b-md md:rounded-b-none">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            المنتجات ({sortedProducts.length})
          </h2>
          <p className="text-sm text-muted-foreground">
            اكتشف مجموعتنا الواسعة من قطع غيار السيارات
          </p>
        </div>

        <Select value={filters.sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-48 flex flex-row-reverse">
            <SelectValue placeholder="ترتيب حسب" />
          </SelectTrigger>
          <SelectContent dir="rtl">
            <SelectItem value="name">الاسم</SelectItem>
            <SelectItem value="price-low">السعر: من الأقل للأعلى</SelectItem>
            <SelectItem value="price-high">السعر: من الأعلى للأقل</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
