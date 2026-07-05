"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProductArt } from "@/components/product/product-art";
import { ProductBadges } from "@/components/product/product-badges";
import { Price } from "@/components/product/price";
import { RatingStars } from "@/components/product/rating-stars";
import { QuantitySelector } from "@/components/product/quantity-selector";
import { useCartStore } from "@/lib/store/cart";
import type { Product } from "@/lib/types";

export function QuickViewModal({
  product,
  open,
  onOpenChange,
}: {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [variantId, setVariantId] = useState(product.variants[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0]!;

  function handleAdd() {
    addItem(product, variant, quantity);
    toast.success(`${product.name} agregado al carrito`);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0">
        <div className="grid gap-0 md:grid-cols-2">
          <ProductArt placeholder={product.images[0]?.placeholder ?? ""} className="md:h-full" />
          <div className="flex flex-col gap-4 p-6 md:p-8">
            <DialogTitle className="pr-8">{product.name}</DialogTitle>
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
            <ProductBadges product={product} />
            <Price product={product} size="lg" />
            <p className="text-sm text-stone-600">{product.shortDescription}</p>

            {product.variants.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setVariantId(v.id)}
                    disabled={v.availability === "out_of_stock"}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${
                      variant.id === v.id
                        ? "border-forest-900 bg-forest-900 text-cream-50"
                        : "border-stone-300 text-forest-800 hover:border-forest-600"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <QuantitySelector quantity={quantity} onChange={setQuantity} />
              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                onClick={handleAdd}
                disabled={product.availability === "out_of_stock"}
              >
                {product.availability === "out_of_stock" ? "Sin stock" : "Agregar al carrito"}
              </Button>
            </div>

            <Link href={`/producto/${product.slug}`} className="text-sm font-medium text-forest-800 underline-offset-4 hover:underline">
              Ver detalle completo →
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
