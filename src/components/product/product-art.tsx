import { Leaf, Coffee, Pipette, FlaskConical, Cookie, Wheat, Package, type LucideIcon } from "lucide-react";
import { categories } from "@/lib/data/categories";
import { cn } from "@/lib/utils";
import type { CategorySlug } from "@/lib/types";

const ICONS: Record<string, LucideIcon> = {
  leaf: Leaf,
  cup: Coffee,
  straw: Pipette,
  flask: FlaskConical,
  cookie: Cookie,
  wheat: Wheat,
  package: Package,
};

/**
 * Generative artwork standing in for product photography — this environment
 * has no access to the source site's images (see docs/CATALOG_SYNC.md).
 * Swapping this for real photos later is a one-line change in ProductCard/
 * ProductGallery since it shares the same aspect-square, object-cover
 * contract as next/image.
 */
export function ProductArt({
  placeholder,
  className,
  iconClassName,
}: {
  placeholder: string;
  className?: string;
  iconClassName?: string;
}) {
  const [categorySlug] = placeholder.split("-") as [CategorySlug];
  const category = categories.find((c) => c.slug === categorySlug) ?? categories[0]!;
  const Icon = ICONS[category.icon] ?? Package;

  return (
    <div
      className={cn(
        "relative flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-br",
        category.gradient,
        className
      )}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 14px)",
        }}
      />
      <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-black/10 blur-2xl" />
      <Icon className={cn("relative h-1/3 w-1/3 text-cream-50/90", iconClassName)} strokeWidth={1.25} />
    </div>
  );
}
