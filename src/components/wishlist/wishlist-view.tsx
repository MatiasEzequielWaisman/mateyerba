"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AutoGrid, AutoGridItem } from "@/components/shared/auto-grid";
import { ProductCard } from "@/components/product/product-card";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useCatalogStore } from "@/lib/store/catalog-store";

export function WishlistView() {
  const slugs = useWishlistStore((s) => s.slugs);
  const allProducts = useCatalogStore((s) => s.products);
  const products = slugs
    .map((slug) => allProducts.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

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
      <AutoGrid className="gap-x-5 gap-y-10">
        {products.map((product) => (
          <AutoGridItem
            key={product.id}
            className="w-[calc((100%-1.25rem)/2)] md:w-[calc((100%-2.5rem)/3)] lg:w-[calc((100%-3.75rem)/4)]"
          >
            <ProductCard product={product} />
          </AutoGridItem>
        ))}
      </AutoGrid>
    </div>
  );
}
