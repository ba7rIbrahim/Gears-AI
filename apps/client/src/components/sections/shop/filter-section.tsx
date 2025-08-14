import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { FilterState } from "@/pages/shop-page";
import { Slider } from "../../ui/slider";

export const FilterSection = ({
  filters,
  onFiltersChange,
}: {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}) => {
  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter((c) => c !== category);

    onFiltersChange({
      ...filters,
      categories: newCategories,
    });
  };

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: [value[0] ?? 0, value[1] ?? 500],
    });
  };

  const categories = ["إطارات", "بطاريات", "زيوت", "أكسسوارات"];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">الفئات</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div
              key={category}
              className="flex items-center gap-2 space-x-2 space-x-reverse"
            >
              <Checkbox
                id={category}
                checked={filters.categories.includes(category)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category, checked as boolean)
                }
                className="size-5"
              />
              <Label
                htmlFor={category}
                className="font-medium text-foreground text-base"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">السعر</h3>
        <div className="space-y-4">
          <Slider
            value={filters.priceRange}
            onValueChange={handlePriceChange}
            min={0}
            max={500}
            step={10}
            className="w-full"
            showTooltip={true}
            tooltipContent={(value) => `$${value}`}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${filters.priceRange[1]}</span>
            <span>${filters.priceRange[0]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
