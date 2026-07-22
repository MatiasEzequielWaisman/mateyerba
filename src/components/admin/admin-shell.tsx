"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, PlusCircle, LogOut, ArrowLeft, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { useAdminAuthStore } from "@/lib/store/admin-auth-store";
import { useCatalogStore } from "@/lib/store/catalog-store";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/productos", label: "Productos", icon: Package },
  { href: "/admin/productos/nuevo", label: "Nuevo producto", icon: PlusCircle },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const logout = useAdminAuthStore((s) => s.logout);
  const resetToSeed = useCatalogStore((s) => s.resetToSeed);

  return (
    <div className="min-h-[70vh] bg-cream-100">
      <div className="border-b border-gold-200 bg-gold-50 px-4 py-2 text-center text-xs font-medium text-gold-700">
        Modo demo — los cambios se guardan solo en este navegador (localStorage), no en un servidor compartido.
      </div>
      <div className="container grid gap-6 py-8 lg:grid-cols-[220px_1fr]">
        <aside className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition",
                  active ? "bg-forest-900 text-cream-50" : "text-forest-800 hover:bg-forest-900/5"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}

          <div className="mt-2 flex flex-row gap-2 border-t-0 pt-0 lg:mt-auto lg:flex-col lg:border-t lg:border-stone-200 lg:pt-4">
            <button
              onClick={() => {
                if (confirm("¿Restablecer el catálogo a los datos originales? Se perderán las ediciones guardadas en este navegador.")) {
                  resetToSeed();
                  toast.success("Catálogo restablecido");
                }
              }}
              className="flex shrink-0 items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-forest-900/5"
            >
              <RotateCcw className="h-4 w-4" /> Restablecer datos
            </button>
            <Link href="/" className="flex shrink-0 items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-forest-900/5">
              <ArrowLeft className="h-4 w-4" /> Volver a la tienda
            </Link>
            <button
              onClick={logout}
              className="flex shrink-0 items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-destructive transition hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" /> Cerrar sesión
            </button>
          </div>
        </aside>

        <main>{children}</main>
      </div>
    </div>
  );
}
