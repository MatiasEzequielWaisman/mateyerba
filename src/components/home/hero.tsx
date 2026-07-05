"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/layout/search-bar";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-forest-900 via-forest-950 to-olive-900">
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{
        backgroundImage: "repeating-linear-gradient(120deg, rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.8) 1px, transparent 1px, transparent 22px)",
      }} />
      <div className="pointer-events-none absolute -top-24 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-gold-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 left-[-10%] h-[24rem] w-[24rem] rounded-full bg-olive-400/20 blur-[120px]" />

      <div className="container relative flex min-h-[85vh] flex-col items-center justify-center gap-8 py-24 text-center md:min-h-[90vh]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2 rounded-full border border-cream-50/20 bg-cream-50/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-gold-200"
        >
          <Leaf className="h-3.5 w-3.5" /> Cosecha seleccionada · Directo del productor
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="balance max-w-3xl font-display text-display-lg font-semibold text-cream-50 md:text-display-xl"
        >
          El ritual del mate, elevado a la máxima expresión.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl text-balance text-lg text-cream-100/80"
        >
          Yerbas, mates, bombillas y termos premium, curados uno por uno. Calidad
          excepcional, diseño atemporal y envíos a todo el país.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-xl"
        >
          <SearchBar size="lg" className="shadow-premium" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Button asChild size="lg" variant="accent">
            <Link href="/catalogo">Explorar catálogo</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-cream-50/30 text-cream-50 hover:bg-cream-50/10">
            <Link href="/catalogo?ofertas=1">Ver ofertas</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
