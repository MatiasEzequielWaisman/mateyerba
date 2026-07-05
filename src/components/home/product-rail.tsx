import { SectionHeading } from "@/components/shared/section-heading";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/lib/types";

export function ProductRail({
  eyebrow,
  title,
  description,
  products,
  cta,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  products: Product[];
  cta?: { label: string; href: string };
}) {
  if (products.length === 0) return null;

  return (
    <section className="container py-16">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} cta={cta} className="mb-10" />
      <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
