"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function SearchBar({ className, size = "default" }: { className?: string; size?: "default" | "lg" }) {
  const router = useRouter();
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (value.trim()) params.set("q", value.trim());
    router.push(`/catalogo${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <form onSubmit={handleSubmit} role="search" className={cn("relative flex w-full items-center", className)}>
      <Search className="pointer-events-none absolute left-4 h-4 w-4 text-stone-400" />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Buscar yerbas, mates, termos…"
        aria-label="Buscar productos"
        className={cn(
          "w-full rounded-full border border-stone-300 bg-cream-50 pl-11 pr-4 text-sm text-forest-900 placeholder:text-stone-400 focus-visible:border-forest-600",
          size === "lg" ? "h-14 text-base" : "h-11"
        )}
      />
    </form>
  );
}
