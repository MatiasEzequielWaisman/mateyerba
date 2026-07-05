import Link from "next/link";
import { Leaf, Instagram, Facebook, MessageCircle, CreditCard } from "lucide-react";
import { categories } from "@/lib/data/categories";
import { FooterNewsletterForm } from "@/components/layout/footer-newsletter-form";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-forest-950 text-cream-100">
      <div className="container grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link href="/" className="mb-4 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-50 text-forest-900">
              <Leaf className="h-[18px] w-[18px]" />
            </span>
            <span className="font-display text-lg font-semibold">Yerbas de la Buena</span>
          </Link>
          <p className="max-w-sm text-sm text-cream-100/70">
            Yerbas, mates, bombillas y accesorios seleccionados para acompañar tu ritual diario.
            Calidad premium, directo del productor a tu mesa.
          </p>

          <FooterNewsletterForm />

          <div className="mt-6 flex gap-3">
            <a href="#" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-50/10 transition hover:bg-cream-50/20">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-50/10 transition hover:bg-cream-50/20">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" aria-label="WhatsApp" className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-50/10 transition hover:bg-cream-50/20">
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gold-300">Categorías</h3>
          <ul className="flex flex-col gap-2.5 text-sm text-cream-100/75">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/catalogo?categoria=${c.slug}`} className="transition hover:text-cream-50">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gold-300">Ayuda</h3>
          <ul className="flex flex-col gap-2.5 text-sm text-cream-100/75">
            <li><Link href="/preguntas-frecuentes" className="transition hover:text-cream-50">Preguntas frecuentes</Link></li>
            <li><Link href="/envios" className="transition hover:text-cream-50">Envíos y entregas</Link></li>
            <li><Link href="/cambios-y-devoluciones" className="transition hover:text-cream-50">Cambios y devoluciones</Link></li>
            <li><Link href="/contacto" className="transition hover:text-cream-50">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gold-300">Legales</h3>
          <ul className="flex flex-col gap-2.5 text-sm text-cream-100/75">
            <li><Link href="/terminos" className="transition hover:text-cream-50">Términos y condiciones</Link></li>
            <li><Link href="/privacidad" className="transition hover:text-cream-50">Política de privacidad</Link></li>
            <li><Link href="/cookies" className="transition hover:text-cream-50">Política de cookies</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream-50/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-xs text-cream-100/60 md:flex-row">
          <p>© {new Date().getFullYear()} Yerbas de la Buena. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-3">
              <CreditCard className="h-4 w-4" />
              Visa · Mastercard · Mercado Pago · Transferencia
            </span>
            <Link href="/admin" className="transition hover:text-cream-50">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
