interface LoaderProps {
  size?: "sm" | "md" | "lg";
}

export const Loader = ({ size = "md" }: LoaderProps) => {
  const sizeClasses = {
    sm: "w-[40px]",
    md: "w-[65px]",
    lg: "w-[90px]",
  };

  return (
    <div className={`relative ${sizeClasses[size]} aspect-square`}>
      <span className="absolute rounded-[50px] animate-loaderAnim shadow-[inset_0_0_0_3px] shadow-gray-800 dark:shadow-gray-100" />
      <span className="absolute rounded-[50px] animate-loaderAnim animation-delay shadow-[inset_0_0_0_3px] shadow-gray-800 dark:shadow-gray-100" />
    </div>
  );
};
