import { brands } from "@/lib/data/brands";
import { SectionHeading } from "@/components/shared/section-heading";
import { AutoGrid, AutoGridItem } from "@/components/shared/auto-grid";

export function BrandStrip() {
  const featured = brands.filter((b) => b.featured);

  return (
    <section className="bg-beige-100 py-16">
      <div className="container">
        <SectionHeading eyebrow="Confían en nosotros" title="Marcas destacadas" align="center" className="mb-10" />
        <AutoGrid className="gap-4">
          {featured.map((brand) => (
            <AutoGridItem
              key={brand.slug}
              className="w-[calc((100%-1rem)/2)] sm:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-5rem)/6)]"
            >
              <div
                className="flex h-24 items-center justify-center rounded-lg border border-beige-300 bg-cream-50 px-4 text-center shadow-soft transition hover:shadow-card"
                title={brand.description}
              >
                <span className="font-display text-sm font-semibold text-forest-900">{brand.name}</span>
              </div>
            </AutoGridItem>
          ))}
        </AutoGrid>
      </div>
    </section>
  );
}
