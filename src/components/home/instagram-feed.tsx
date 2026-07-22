import { Instagram } from "lucide-react";
import { categories } from "@/lib/data/categories";
import { SectionHeading } from "@/components/shared/section-heading";

/**
 * Static placeholder grid — a live version would pull the latest posts from
 * the Instagram Graph API server-side. Kept as generative tiles here since
 * this environment has no network access to Instagram or the source site.
 */
export function InstagramFeed() {
  const tiles = [...categories, ...categories].slice(0, 6);

  return (
    <section className="container py-16">
      <SectionHeading
        eyebrow="@negociodemate"
        title="Seguinos en Instagram"
        align="center"
        className="mb-10"
      />
      <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
        {tiles.map((c, i) => (
          <a
            key={`${c.slug}-${i}`}
            href="#"
            className={`group relative flex aspect-square items-center justify-center overflow-hidden rounded-md bg-gradient-to-br ${c.gradient}`}
            aria-label="Ver publicación en Instagram"
          >
            <Instagram className="h-6 w-6 text-cream-50/0 transition-colors duration-300 group-hover:text-cream-50/90" />
          </a>
        ))}
      </div>
    </section>
  );
}
