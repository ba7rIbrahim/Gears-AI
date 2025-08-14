import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { Loader } from "lucide-react";

const spinnerVariants = cva("text-muted-foreground animate-spin", {
  variants: {
    size: {
      default: "h-5 w-5",
      sm: "h-2 w-2",
      lg: "h-6 w-6",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type SpinnerProps = VariantProps<typeof spinnerVariants>;

export const Spinner = ({ size }: SpinnerProps = {}) => {
  return <Loader className={cn(spinnerVariants({ size }))} />;
};
