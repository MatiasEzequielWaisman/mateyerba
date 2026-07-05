"use client";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import type { SortOption } from "@/lib/types";

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Destacados" },
  { value: "best_selling", label: "Más vendidos" },
  { value: "price_asc", label: "Menor precio" },
  { value: "price_desc", label: "Mayor precio" },
  { value: "newest", label: "Más recientes" },
];

export function SortSelect({ value, onChange }: { value: SortOption; onChange: (value: SortOption) => void }) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as SortOption)}>
      <SelectTrigger className="w-full sm:w-56" aria-label="Ordenar por">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {OPTIONS.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
