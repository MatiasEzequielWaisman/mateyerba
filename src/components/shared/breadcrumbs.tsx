import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500">
      <Link href="/" className="transition hover:text-forest-800">
        Inicio
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight className="h-3 w-3" />
          {item.href ? (
            <Link href={item.href} className="transition hover:text-forest-800">
              {item.label}
            </Link>
          ) : (
            <span aria-current="page" className="text-forest-900">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
