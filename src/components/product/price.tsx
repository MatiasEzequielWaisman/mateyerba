import { discountPercent, formatInstallments, formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Price({ product, className, size = "default" }: { product: Product; className?: string; size?: "default" | "lg" }) {
  const discount = discountPercent(product.price, product.compareAtPrice);

  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      <div className="flex items-center gap-2">
        <span className={cn("font-display font-semibold text-forest-950", size === "lg" ? "text-2xl" : "text-base")}>
          {formatPrice(product.price)}
        </span>
        {discount > 0 && (
          <>
            <span className="text-sm text-stone-400 line-through">{formatPrice(product.compareAtPrice!)}</span>
            <span className="rounded-full bg-gold-100 px-2 py-0.5 text-xs font-semibold text-gold-700">
              -{discount}%
            </span>
          </>
        )}
      </div>
      {product.installments && (
        <span className="text-xs text-olive-700">
          {formatInstallments(product.price, product.installments.count)}
          {product.installments.interestFree ? " sin interés" : ""}
        </span>
      )}
    </div>
  );
}
