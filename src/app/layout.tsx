import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/toaster";
import { OrganizationJsonLd } from "@/components/seo/json-ld";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

const SITE_URL = "https://www.negociodemate.com.ar";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Negocio de Mate — Yerbas, mates y accesorios premium",
    template: "%s · Negocio de Mate",
  },
  description:
    "Yerbas, mates, bombillas, termos y alfajores seleccionados. Envíos a todo el país, compra 100% segura y hasta 12 cuotas sin interés.",
  keywords: ["yerba mate", "mates", "bombillas", "termos", "alfajores", "accesorios de mate", "comprar yerba online"],
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Negocio de Mate",
    title: "Negocio de Mate — Yerbas, mates y accesorios premium",
    description:
      "Yerbas, mates, bombillas, termos y alfajores seleccionados. Envíos a todo el país y compra 100% segura.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Negocio de Mate",
    description: "Yerbas, mates, bombillas, termos y alfajores seleccionados.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${inter.variable} ${manrope.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        <OrganizationJsonLd />
        <QueryProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <CartDrawer />
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
