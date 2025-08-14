import { Suspense } from "react";
import { Loader } from "./loader";

export const SuspenseWrapper = ({
  children,
  fullScreen = true,
  className = "",
}: {
  children: React.ReactNode;
  fullScreen?: boolean;
  className?: string;
}) => {
  return (
    <Suspense
      fallback={
        <div
          className={`${fullScreen ? "h-screen" : "h-auto"} flex justify-center items-center w-full ${className}`}
        >
          <Loader size="lg" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};
