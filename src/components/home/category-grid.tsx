import Link from "next/link";
import { Leaf, Coffee, Pipette, FlaskConical, Cookie, Wheat, Package, type LucideIcon } from "lucide-react";
import { categories } from "@/lib/data/categories";
import { SectionHeading } from "@/components/shared/section-heading";

const ICONS: Record<string, LucideIcon> = {
  leaf: Leaf,
  cup: Coffee,
  straw: Pipette,
  flask: FlaskConical,
  cookie: Cookie,
  wheat: Wheat,
  package: Package,
};

export function CategoryGrid() {
  return (
    <section className="container py-20">
      <SectionHeading eyebrow="Explorá" title="Categorías destacadas" className="mb-10" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {categories.map((category) => {
          const Icon = ICONS[category.icon] ?? Package;
          return (
            <Link
              key={category.slug}
              href={`/catalogo?categoria=${category.slug}`}
              className={`group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-lg bg-gradient-to-br p-5 shadow-soft transition-shadow duration-300 hover:shadow-elevated ${category.gradient}`}
            >
              <Icon className="absolute right-4 top-4 h-8 w-8 text-cream-50/40 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" strokeWidth={1.25} />
              <span className="font-display text-lg font-semibold text-cream-50">{category.name}</span>
              <span className="mt-1 text-xs text-cream-100/70 line-clamp-2">{category.description}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
