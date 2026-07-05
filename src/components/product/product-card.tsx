"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { toast } from "sonner";
import { ProductArt } from "@/components/product/product-art";
import { ProductBadges } from "@/components/product/product-badges";
import { Price } from "@/components/product/price";
import { RatingStars } from "@/components/product/rating-stars";

const QuickViewModal = dynamic(
  () => import("@/components/product/quick-view-modal").then((m) => m.QuickViewModal),
  { ssr: false }
);
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { getBrandBySlug } from "@/lib/data/brands";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const wishlisted = useWishlistStore((s) => s.has(product.slug));
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const brand = getBrandBySlug(product.brandSlug);
  const outOfStock = product.availability === "out_of_stock";

  function handleQuickAdd() {
    const variant = product.variants.find((v) => v.availability !== "out_of_stock") ?? product.variants[0];
    if (!variant || outOfStock) return;
    addItem(product, variant);
    toast.success(`${product.name} agregado al carrito`);
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn("group relative flex flex-col", className)}
      >
        <div className="relative overflow-hidden rounded-lg">
          <Link href={`/producto/${product.slug}`} className="block" tabIndex={-1}>
            <div className="transition-transform duration-700 ease-premium group-hover:scale-[1.04]">
              <ProductArt placeholder={product.images[0]?.placeholder ?? ""} />
            </div>
          </Link>

          <div className="absolute left-3 top-3 z-10">
            <ProductBadges product={product} />
          </div>

          <button
            type="button"
            onClick={() => toggleWishlist(product.slug)}
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-cream-50/90 text-forest-900 shadow-soft transition hover:bg-cream-50"
            aria-pressed={wishlisted}
            aria-label={wishlisted ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            <Heart className={cn("h-4 w-4", wishlisted && "fill-gold-500 text-gold-500")} />
          </button>

          <div className="absolute inset-x-3 bottom-3 z-10 flex translate-y-4 gap-2 opacity-0 transition-all duration-300 ease-premium group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={handleQuickAdd}
              disabled={outOfStock}
              className="flex h-10 flex-1 items-center justify-center gap-2 rounded-full bg-forest-950 text-xs font-semibold uppercase tracking-wide text-cream-50 shadow-elevated transition hover:bg-forest-800 disabled:cursor-not-allowed disabled:bg-stone-400"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              {outOfStock ? "Sin stock" : "Agregar"}
            </button>
            <button
              type="button"
              onClick={() => setQuickViewOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-50 text-forest-900 shadow-elevated transition hover:bg-cream-100"
              aria-label="Vista rápida"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-1.5">
          {brand && <span className="text-xs font-medium uppercase tracking-wide text-olive-700">{brand.name}</span>}
          <Link href={`/producto/${product.slug}`} className="line-clamp-2 font-display text-sm font-medium text-forest-950 hover:text-forest-700">
            {product.name}
          </Link>
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
          <Price product={product} />
        </div>
      </motion.div>

      <QuickViewModal product={product} open={quickViewOpen} onOpenChange={setQuickViewOpen} />
    </>
  );
}
