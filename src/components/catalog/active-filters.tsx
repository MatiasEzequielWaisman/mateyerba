"use client";

import { X } from "lucide-react";
import { getCategoryBySlug } from "@/lib/data/categories";
import { getBrandBySlug } from "@/lib/data/brands";
import type { CatalogFiltersState } from "@/components/catalog/filters-sidebar";

export function ActiveFilters({
  filters,
  onChange,
}: {
  filters: CatalogFiltersState;
  onChange: (patch: Partial<CatalogFiltersState>) => void;
}) {
  const pills: { key: string; label: string; remove: () => void }[] = [
    ...filters.categories.map((slug) => ({
      key: `cat-${slug}`,
      label: getCategoryBySlug(slug)?.name ?? slug,
      remove: () => onChange({ categories: filters.categories.filter((s) => s !== slug) }),
    })),
    ...filters.brands.map((slug) => ({
      key: `brand-${slug}`,
      label: getBrandBySlug(slug)?.name ?? slug,
      remove: () => onChange({ brands: filters.brands.filter((s) => s !== slug) }),
    })),
    ...filters.availability.map((a) => ({
      key: `avail-${a}`,
      label: a === "in_stock" ? "En stock" : a === "low_stock" ? "Últimas unidades" : "Sin stock",
      remove: () => onChange({ availability: filters.availability.filter((v) => v !== a) }),
    })),
  ];

  if (pills.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {pills.map((pill) => (
        <button
          key={pill.key}
          onClick={pill.remove}
          className="flex items-center gap-1.5 rounded-full border border-forest-900/20 bg-forest-50 px-3 py-1.5 text-xs font-medium text-forest-900 transition hover:bg-forest-100"
        >
          {pill.label}
          <X className="h-3 w-3" />
        </button>
      ))}
    </div>
  );
}
