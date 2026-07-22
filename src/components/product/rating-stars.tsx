import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function RatingStars({
  rating,
  reviewCount,
  className,
  size = "sm",
}: {
  rating: number;
  reviewCount?: number;
  className?: string;
  size?: "sm" | "md";
}) {
  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-5 w-5";
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              iconSize,
              i < Math.round(rating) ? "fill-gold-500 text-gold-500" : "fill-stone-200 text-stone-200"
            )}
          />
        ))}
      </div>
      <span className="sr-only">{rating} de 5 estrellas</span>
      {reviewCount != null && (
        <span className="text-xs text-stone-500">
          {rating.toFixed(1)} ({reviewCount})
        </span>
      )}
    </div>
  );
}
