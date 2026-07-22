import type { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    slug: "yerbas",
    name: "Yerbas",
    description: "Yerba mate compuesta, con y sin palo, saborizada y orgánica.",
    gradient: "from-forest-700 to-forest-900",
    icon: "leaf",
  },
  {
    slug: "mates",
    name: "Mates",
    description: "Mates de calabaza, madera, cerámica y acero, torneados a mano.",
    gradient: "from-olive-700 to-forest-800",
    icon: "cup",
  },
  {
    slug: "bombillas",
    name: "Bombillas",
    description: "Bombillas de alpaca, acero quirúrgico y edición premium.",
    gradient: "from-gold-600 to-olive-800",
    icon: "straw",
  },
  {
    slug: "termos",
    name: "Termos",
    description: "Termos de acero inoxidable con 12 y 24 horas de retención de temperatura.",
    gradient: "from-stone-700 to-forest-900",
    icon: "flask",
  },
  {
    slug: "alfajores",
    name: "Alfajores",
    description: "Alfajores artesanales de chocolate, maicena y dulce de leche.",
    gradient: "from-gold-500 to-gold-700",
    icon: "cookie",
  },
  {
    slug: "galletitas",
    name: "Galletitas",
    description: "Galletitas dulces y saladas para acompañar el mate.",
    gradient: "from-beige-400 to-gold-600",
    icon: "wheat",
  },
  {
    slug: "accesorios",
    name: "Accesorios",
    description: "Yerberas, materas, cepillos y kits de regalo.",
    gradient: "from-forest-600 to-olive-700",
    icon: "package",
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
