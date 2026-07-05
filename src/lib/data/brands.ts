import type { Brand } from "@/lib/types";

export const brands: Brand[] = [
  { slug: "playadito", name: "Playadito", description: "Yerba mate de Corrientes, suave y aromática.", featured: true },
  { slug: "la-merced", name: "La Merced", description: "Tradición jesuítica en cada hoja de yerba.", featured: true },
  { slug: "rosamonte", name: "Rosamonte", description: "La elegida de Misiones para las juntadas largas.", featured: true },
  { slug: "taragui", name: "Taragüi", description: "Un clásico de sabor intenso y despalado parejo.", featured: true },
  { slug: "cbse", name: "CBSé", description: "Yerbas compuestas y funcionales, sin palo.", featured: false },
  { slug: "cruz-de-malta", name: "Cruz de Malta", description: "Suavidad y equilibrio para el mate de todos los días.", featured: false },
  { slug: "amanda", name: "Amanda", description: "Selección premium de hojas jóvenes.", featured: false },
  { slug: "nobleza-gaucha", name: "Nobleza Gaucha", description: "Sabor fuerte, estilo de campo.", featured: false },
  { slug: "stanley", name: "Stanley", description: "Termos y contenedores indestructibles desde 1913.", featured: true },
  { slug: "lumilagro", name: "Lumilagro", description: "Termos y accesorios de acero argentinos.", featured: false },
  { slug: "cebra", name: "Cebra", description: "Mates y bombillas de diseño artesanal.", featured: true },
  { slug: "havanna", name: "Havanna", description: "Los alfajores de dulce de leche más queridos de Argentina.", featured: true },
  { slug: "balcarce", name: "Balcarce", description: "Alfajores de maicena artesanales.", featured: false },
  { slug: "bagley", name: "Bagley", description: "Galletitas clásicas para toda ocasión.", featured: false },
];

export function getBrandBySlug(slug: string) {
  return brands.find((b) => b.slug === slug);
}
