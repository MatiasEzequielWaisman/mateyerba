"use client";

import Link from "next/link";
import { Package, AlertTriangle, Star, Wallet } from "lucide-react";
import { StatCard } from "@/components/admin/stat-card";
import { useCatalogStore } from "@/lib/store/catalog-store";
import { getBrandBySlug } from "@/lib/data/brands";
import { formatPrice } from "@/lib/utils";

export function AdminDashboard() {
  const products = useCatalogStore((s) => s.products);

  const outOfStock = products.filter((p) => p.availability === "out_of_stock");
  const lowStock = products.filter((p) => p.availability === "low_stock");
  const featured = products.filter((p) => p.isFeatured);
  const inventoryValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  const lowStockSorted = [...lowStock, ...outOfStock].sort((a, b) => a.stock - b.stock).slice(0, 6);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-display-sm font-semibold text-forest-950">Dashboard</h1>
        <p className="mt-1 text-sm text-stone-500">Resumen general del catálogo.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Package} label="Productos totales" value={String(products.length)} />
        <StatCard icon={AlertTriangle} label="Sin stock / últimas unidades" value={String(outOfStock.length + lowStock.length)} tone="warning" />
        <StatCard icon={Star} label="Destacados" value={String(featured.length)} tone="accent" />
        <StatCard icon={Wallet} label="Valor de inventario" value={formatPrice(inventoryValue)} />
      </div>

      <div className="rounded-lg border border-stone-200 bg-cream-50 p-6 shadow-soft">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-forest-950">Stock a atender</h2>
          <Link href="/admin/productos" className="text-sm font-medium text-forest-800 underline-offset-4 hover:underline">
            Ver todos los productos
          </Link>
        </div>
        {lowStockSorted.length === 0 ? (
          <p className="text-sm text-stone-500">No hay productos con stock bajo en este momento.</p>
        ) : (
          <ul className="flex flex-col divide-y divide-stone-200">
            {lowStockSorted.map((p) => (
              <li key={p.slug} className="flex items-center justify-between py-3">
                <div>
                  <Link href={`/admin/productos/${p.slug}`} className="text-sm font-medium text-forest-950 hover:underline">
                    {p.name}
                  </Link>
                  <p className="text-xs text-stone-500">{getBrandBySlug(p.brandSlug)?.name}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    p.availability === "out_of_stock" ? "bg-destructive/10 text-destructive" : "bg-gold-100 text-gold-700"
                  }`}
                >
                  {p.availability === "out_of_stock" ? "Sin stock" : `${p.stock} unidades`}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
