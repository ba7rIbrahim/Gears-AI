import { Skeleton } from "@/components/ui/skeleton";

export const OrderCardSkeleton = () => {
  return (
    <div className="w-full h-[80px] rounded p-3 flex flex-row gap-x-4">
      <div className="h-full w-[100px]">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="flex flex-col flex-1 gap-y-2 justify-between my-2">
        <Skeleton className="w-1/2 h-4" />
        <Skeleton className="w-1/3 h-4" />
      </div>
    </div>
  );
};
