"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { useWishlistStore } from "@/lib/store/wishlist";
import { getProductBySlug } from "@/lib/data/products";

export function WishlistView() {
  const slugs = useWishlistStore((s) => s.slugs);
  const products = slugs.map((slug) => getProductBySlug(slug)).filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (products.length === 0) {
    return (
      <div className="container flex flex-col items-center gap-4 py-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-stone-400">
          <Heart className="h-7 w-7" />
        </span>
        <h1 className="font-display text-xl font-semibold text-forest-950">Todavía no tenés favoritos</h1>
        <p className="text-sm text-stone-500">Guardá los productos que más te gusten para encontrarlos rápido.</p>
        <Button asChild>
          <Link href="/catalogo">Explorar catálogo</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <h1 className="mb-8 font-display text-display-sm font-semibold text-forest-950">Mis favoritos</h1>
      <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
