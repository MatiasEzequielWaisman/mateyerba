"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { SearchBar } from "@/components/layout/search-bar";
import { categories } from "@/lib/data/categories";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-forest-900 transition hover:bg-forest-900/5 lg:hidden"
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-xs">
        <SheetHeader>
          <SheetTitle>Menú</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-6 px-6 py-5">
          <SearchBar />
          <nav className="flex flex-col gap-1">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-stone-500">Categorías</p>
            {categories.map((c) => (
              <SheetClose asChild key={c.slug}>
                <Link
                  href={`/catalogo?categoria=${c.slug}`}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-forest-950 transition hover:bg-forest-50"
                >
                  {c.name}
                </Link>
              </SheetClose>
            ))}
          </nav>
          <div className="flex flex-col gap-1 border-t border-stone-200 pt-4">
            <SheetClose asChild>
              <Link href="/catalogo?destacados=1" className="rounded-md px-3 py-2.5 text-sm text-forest-800 hover:bg-forest-50">
                Destacados
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/catalogo?ofertas=1" className="rounded-md px-3 py-2.5 text-sm text-forest-800 hover:bg-forest-50">
                Ofertas
              </Link>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
