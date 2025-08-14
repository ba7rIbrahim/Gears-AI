import { FilterSection } from "@/components/sections/shop";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { FilterState } from "@/pages/shop-page";
import { Filter, Search } from "lucide-react";

export const MobileHeader = ({
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
    <div className="lg:hidden border-b border-border bg-card rounded-t-md md:rounded-t-none p-4 mt-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">قطع غيار السيارات</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              فلترة
            </Button>
          </SheetTrigger>
          <SheetContent className="w-5/6 px-4">
            <SheetHeader>
              <SheetTitle>الفلاتر</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <div className="relative mb-6">
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
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
