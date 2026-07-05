"use client";

import { useState } from "react";
import Image from "next/image";
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
 * Product photo with a generative-artwork fallback. Pass `url` (set from
 * /admin — see docs/ADMIN_PANEL.md) to show a real photo; if it's missing,
 * broken, or fails to load, this renders the same gradient+icon placeholder
 * used across the catalog seed instead of a broken image icon.
 */
export function ProductArt({
  placeholder,
  url,
  alt,
  className,
  iconClassName,
  priority,
}: {
  placeholder: string;
  url?: string;
  alt?: string;
  className?: string;
  iconClassName?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const [categorySlug] = placeholder.split("-") as [CategorySlug];
  const category = categories.find((c) => c.slug === categorySlug) ?? categories[0]!;
  const Icon = ICONS[category.icon] ?? Package;

  if (url && !failed) {
    return (
      <div className={cn("relative aspect-square overflow-hidden bg-cream-200", className)}>
        <Image
          src={url}
          alt={alt ?? ""}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          priority={priority}
          className="object-cover"
          onError={() => setFailed(true)}
          unoptimized
        />
      </div>
    );
  }

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
