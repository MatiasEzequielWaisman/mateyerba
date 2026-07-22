"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function QuantitySelector({
  quantity,
  onChange,
  max,
  className,
}: {
  quantity: number;
  onChange: (next: number) => void;
  max?: number;
  className?: string;
}) {
  return (
    <div className={cn("inline-flex items-center rounded-full border border-stone-300", className)}>
      <button
        type="button"
        onClick={() => onChange(Math.max(1, quantity - 1))}
        className="flex h-10 w-10 items-center justify-center rounded-full text-forest-800 transition hover:bg-forest-50 disabled:opacity-40"
        disabled={quantity <= 1}
        aria-label="Restar cantidad"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-8 text-center text-sm font-semibold text-forest-950" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(max ? Math.min(max, quantity + 1) : quantity + 1)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-forest-800 transition hover:bg-forest-50 disabled:opacity-40"
        disabled={max != null && quantity >= max}
        aria-label="Sumar cantidad"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
