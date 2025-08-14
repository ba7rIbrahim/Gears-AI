import { Skeleton } from "@/components/ui/skeleton";

export const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3" dir="rtl">
      <Skeleton className="h-[200px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="w-1/2 h-4" />
        <Skeleton className="w-1/3 h-4" />
      </div>
    </div>
  );
};
