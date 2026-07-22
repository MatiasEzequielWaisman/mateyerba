"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Heart, Share2, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/product/price";
import { RatingStars } from "@/components/product/rating-stars";
import { ProductBadges } from "@/components/product/product-badges";
import { QuantitySelector } from "@/components/product/quantity-selector";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useCatalogStore } from "@/lib/store/catalog-store";
import { getBrandBySlug } from "@/lib/data/brands";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function PurchasePanel({ product: initialProduct }: { product: Product }) {
  const router = useRouter();
  // Prefer the live, admin-editable copy (price/stock/badges) over the
  // build-time snapshot passed from the server, so /admin edits show up
  // immediately without a rebuild.
  const product = useCatalogStore((s) => s.products.find((p) => p.slug === initialProduct.slug)) ?? initialProduct;
  const [variantId, setVariantId] = useState(product.variants[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const wishlisted = useWishlistStore((s) => s.has(product.slug));
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const brand = getBrandBySlug(product.brandSlug);

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0]!;
  const outOfStock = variant.availability === "out_of_stock";

  function handleAddToCart() {
    addItem(product, variant, quantity);
    toast.success(`${product.name} agregado al carrito`);
  }

  function handleBuyNow() {
    addItem(product, variant, quantity);
    router.push("/checkout");
  }

  function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ title: product.name, text: product.shortDescription, url: window.location.href }).catch(() => {});
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Enlace copiado al portapapeles");
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {brand && <span className="text-sm font-medium uppercase tracking-wide text-olive-700">{brand.name}</span>}
      <h1 className="font-display text-display-sm font-semibold text-forest-950">{product.name}</h1>
      <div className="flex items-center gap-4">
        <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="md" />
        <ProductBadges product={product} />
      </div>

      <Price product={product} size="lg" />

      <p className="text-sm leading-relaxed text-stone-600">{product.shortDescription}</p>

      {product.variants.length > 1 && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
            Variante: <span className="text-forest-900">{variant.label}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setVariantId(v.id)}
                disabled={v.availability === "out_of_stock"}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40",
                  variant.id === v.id
                    ? "border-forest-900 bg-forest-900 text-cream-50"
                    : "border-stone-300 text-forest-800 hover:border-forest-600"
                )}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <p className="text-sm">
        {outOfStock ? (
          <span className="font-medium text-destructive">Sin stock temporalmente</span>
        ) : variant.stock <= 10 ? (
          <span className="font-medium text-gold-700">¡Últimas {variant.stock} unidades!</span>
        ) : (
          <span className="font-medium text-olive-700">En stock, listo para enviar</span>
        )}
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <QuantitySelector quantity={quantity} onChange={setQuantity} max={variant.stock || undefined} />
        <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={outOfStock}>
          Agregar al carrito
        </Button>
      </div>
      <div className="flex gap-3">
        <Button size="lg" variant="accent" className="flex-1" onClick={handleBuyNow} disabled={outOfStock}>
          Comprar ahora
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={() => toggleWishlist(product.slug)}
          aria-pressed={wishlisted}
          aria-label="Agregar a favoritos"
        >
          <Heart className={cn("h-5 w-5", wishlisted && "fill-gold-500 text-gold-500")} />
        </Button>
        <Button size="icon" variant="outline" onClick={handleShare} aria-label="Compartir">
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid gap-3 border-t border-stone-200 pt-5 text-xs text-stone-600 sm:grid-cols-3">
        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-forest-700" /> Envíos a todo el país
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-forest-700" /> Compra 100% segura
        </div>
        <div className="flex items-center gap-2">
          <RotateCcw className="h-4 w-4 text-forest-700" /> Cambios sin cargo
        </div>
      </div>
    </div>
  );
}
