import { Badge } from "@/components/ui/badge";
import { discountPercent } from "@/lib/utils";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProductBadges({ product, className }: { product: Product; className?: string }) {
  const discount = discountPercent(product.price, product.compareAtPrice);

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {product.availability === "out_of_stock" && <Badge variant="outOfStock">Sin stock</Badge>}
      {discount > 0 && <Badge variant="sale">-{discount}% Oferta</Badge>}
      {product.isNew && <Badge variant="new">Nuevo</Badge>}
      {product.freeShipping && <Badge variant="freeShipping">Envío gratis</Badge>}
    </div>
  );
}
