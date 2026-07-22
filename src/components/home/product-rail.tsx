"use client";

import { SectionHeading } from "@/components/shared/section-heading";
import { AutoGrid, AutoGridItem } from "@/components/shared/auto-grid";
import { ProductCard } from "@/components/product/product-card";
import { useCatalogStore } from "@/lib/store/catalog-store";
import type { Product } from "@/lib/types";

const ITEM_WIDTH = "w-[calc((100%-1.25rem)/2)] md:w-[calc((100%-2.5rem)/3)] lg:w-[calc((100%-3.75rem)/4)]";

export type RailFilter = "featured" | "new" | "bestseller" | "onsale";

function applyRailFilter(products: Product[], filter: RailFilter) {
  switch (filter) {
    case "featured":
      return products.filter((p) => p.isFeatured);
    case "new":
      return products.filter((p) => p.isNew);
    case "bestseller":
      return products.filter((p) => p.isBestSeller);
    case "onsale":
      return products.filter((p) => p.compareAtPrice && p.compareAtPrice > p.price);
  }
}

type ProductRailProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  cta?: { label: string; href: string };
} & ({ filter: RailFilter; products?: never } | { products: Product[]; filter?: never });

/**
 * Home rails pass a `filter` key and read live from the admin-editable
 * catalog store, so edits made in /admin show up here immediately. Callers
 * that already have a resolved list (e.g. "related products" on a static
 * product detail page) can pass `products` directly instead.
 */
export function ProductRail(props: ProductRailProps) {
  const storeProducts = useCatalogStore((s) => s.products);
  const products = props.filter ? applyRailFilter(storeProducts, props.filter) : props.products!;

  if (products.length === 0) return null;

  return (
    <section className="container py-16">
      <SectionHeading eyebrow={props.eyebrow} title={props.title} description={props.description} cta={props.cta} className="mb-10" />
      <AutoGrid className="gap-x-5 gap-y-10">
        {products.slice(0, 8).map((product) => (
          <AutoGridItem key={product.id} className={ITEM_WIDTH}>
            <ProductCard product={product} />
          </AutoGridItem>
        ))}
      </AutoGrid>
    </section>
  );
}
