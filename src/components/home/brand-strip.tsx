import { brands } from "@/lib/data/brands";
import { SectionHeading } from "@/components/shared/section-heading";

export function BrandStrip() {
  const featured = brands.filter((b) => b.featured);

  return (
    <section className="bg-beige-100 py-16">
      <div className="container">
        <SectionHeading eyebrow="Confían en nosotros" title="Marcas destacadas" align="center" className="mb-10" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {featured.map((brand) => (
            <div
              key={brand.slug}
              className="flex h-24 items-center justify-center rounded-lg border border-beige-300 bg-cream-50 px-4 text-center shadow-soft transition hover:shadow-card"
              title={brand.description}
            >
              <span className="font-display text-sm font-semibold text-forest-900">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
