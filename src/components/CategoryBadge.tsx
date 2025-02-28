
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  category: string;
  selected?: boolean;
  onClick?: () => void;
}

export const CategoryBadge = ({ category, selected, onClick }: CategoryBadgeProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200",
        "hover:bg-secondary/80 hover:shadow-sm",
        selected
          ? "bg-primary text-primary-foreground shadow-sm"
          : "bg-secondary/70 text-secondary-foreground"
      )}
    >
      {category}
    </button>
  );
};
