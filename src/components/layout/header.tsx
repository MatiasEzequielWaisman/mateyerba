"use client";

import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Heart, ShoppingBag, User, ChevronDown, Leaf } from "lucide-react";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SearchBar } from "@/components/layout/search-bar";
import { useCartStore, cartCount } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { categories } from "@/lib/data/categories";
import { cn } from "@/lib/utils";

export function Header() {
  const lines = useCartStore((s) => s.lines);
  const toggleCart = useCartStore((s) => s.toggle);
  const wishlistCount = useWishlistStore((s) => s.slugs.length);
  const itemCount = cartCount(lines);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/70 bg-cream-50/90 backdrop-blur-md">
      <div className="hidden bg-forest-950 py-2 text-center text-xs text-cream-100 md:block">
        Envíos a todo el país &middot; Hasta 12 cuotas sin interés &middot; Compra 100% segura
      </div>

      <div className="container flex h-18 items-center gap-4 py-3">
        <MobileNav />

        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-900 text-cream-50">
            <Leaf className="h-[18px] w-[18px]" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-forest-950">
            Yerbas de la Buena
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-forest-900 transition hover:bg-forest-900/5">
              Categorías <ChevronDown className="h-3.5 w-3.5" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="start"
                sideOffset={12}
                className="z-50 grid w-[560px] grid-cols-2 gap-1 rounded-lg border border-stone-200 bg-cream-50 p-3 shadow-elevated data-[state=open]:animate-in data-[state=open]:fade-in"
              >
                {categories.map((c) => (
                  <DropdownMenu.Item key={c.slug} asChild>
                    <Link
                      href={`/catalogo?categoria=${c.slug}`}
                      className="flex flex-col gap-0.5 rounded-md px-3 py-2.5 outline-none transition hover:bg-forest-50 focus:bg-forest-50"
                    >
                      <span className="text-sm font-semibold text-forest-950">{c.name}</span>
                      <span className="text-xs text-stone-500 line-clamp-1">{c.description}</span>
                    </Link>
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          <Link href="/catalogo?destacados=1" className="rounded-full px-3 py-2 text-sm font-medium text-forest-900 transition hover:bg-forest-900/5">
            Destacados
          </Link>
          <Link href="/catalogo?ofertas=1" className="rounded-full px-3 py-2 text-sm font-medium text-gold-700 transition hover:bg-gold-50">
            Ofertas
          </Link>
        </nav>

        <SearchBar className="mx-auto hidden max-w-md flex-1 md:flex" />

        <div className="ml-auto flex items-center gap-1">
          <Link
            href="/cuenta"
            className="flex h-10 w-10 items-center justify-center rounded-full text-forest-900 transition hover:bg-forest-900/5"
            aria-label="Mi cuenta"
          >
            <User className="h-5 w-5" />
          </Link>
          <Link
            href="/favoritos"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-forest-900 transition hover:bg-forest-900/5"
            aria-label="Favoritos"
          >
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[0.6rem] font-bold text-forest-950">
                {wishlistCount}
              </span>
            )}
          </Link>
          <button
            onClick={toggleCart}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-forest-900 transition hover:bg-forest-900/5"
            aria-label={`Carrito, ${itemCount} productos`}
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span
                className={cn(
                  "absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-forest-900 text-[0.6rem] font-bold text-cream-50"
                )}
              >
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="container pb-3 md:hidden">
        <SearchBar />
      </div>
    </header>
  );
}
