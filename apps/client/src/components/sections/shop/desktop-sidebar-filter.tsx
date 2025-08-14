import { Search } from "lucide-react";
import { FilterSection } from "./filter-section";
import type { FilterState } from "@/pages/shop-page";

export const DesktopSidebarFilter = ({
  searchQuery,
  setSearchQuery,
  filters,
  setFilters,
}: {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}) => {
  return (
    <div className="hidden lg:block w-80 border-l d border-border bg-card">
      <div className="sticky top-0 p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            قطع غيار السيارات
          </h2>
          <p className="text-muted-foreground">اعثر على أفضل قطع الغيار</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="البحث عن المنتجات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        </div>

        <FilterSection filters={filters} onFiltersChange={setFilters} />
      </div>
    </div>
  );
};
