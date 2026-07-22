import type {
  Availability,
  CategorySlug,
  FaqItem,
  Product,
  ProductImage,
  ProductVariant,
  Review,
} from "@/lib/types";

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Small deterministic string hash so ratings/review counts stay stable across builds. */
function hash(value: string) {
  let h = 0;
  for (let i = 0; i < value.length; i++) {
    h = (h << 5) - h + value.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

const REVIEW_AUTHORS = [
  "Martina G.", "Julián R.", "Sofía P.", "Nicolás A.", "Camila V.",
  "Federico L.", "Valentina M.", "Tomás D.", "Lucía F.", "Agustín S.",
];

const REVIEW_TEMPLATES: Record<CategorySlug, { title: string; body: string }[]> = {
  yerbas: [
    { title: "Sabor parejo en cada mate", body: "La compré para reponer el stock de casa y no decepciona: sabor suave, poco polvo y aroma bien intenso desde el primer cebado." },
    { title: "Llegó perfecta", body: "El paquete llegó bien sellado y con fecha de elaboración reciente. Rinde muchísimo más que la que compraba en el supermercado." },
    { title: "Ideal para tomar de mañana", body: "Es mi yerba de cabecera hace meses. Cebo con agua a 75°C y me acompaña toda la mañana sin amargar." },
  ],
  mates: [
    { title: "Terminación impecable", body: "El mate llegó curado y listo para usar. La madera tiene un acabado hermoso y se nota el trabajo artesanal." },
    { title: "Como el de las fotos, o mejor", body: "Superó mis expectativas, el tamaño es cómodo para la mano y mantiene la temperatura muy bien." },
    { title: "Regalo ideal", body: "Lo compré de regalo y quedó encantado. Viene con instructivo de curado, se agradece el detalle." },
  ],
  bombillas: [
    { title: "No se tapa con palitos", body: "El filtro de esta bombilla es de los mejores que probé, apenas pasa yerba y es fácil de desarmar para limpiar." },
    { title: "Muy cómoda en la boca", body: "El pico es suave y no lastima, la uso todos los días hace un mes y sigue como nueva." },
    { title: "Excelente relación precio calidad", body: "Es de alpaca genuina, no se despinta y el resorte del filtro tiene buena firmeza." },
  ],
  termos: [
    { title: "Mantiene la temperatura como prometen", body: "Cebé agua a la mañana y a la tarde seguía bien caliente. Es pesado pero se siente de calidad premium." },
    { title: "Perfecto para la oficina", body: "Cabe en la mochila y no pierde una gota. Lo uso todos los días para llevar agua caliente al trabajo." },
    { title: "Muy buen pico cebador", body: "El pico dosifica justo la cantidad de agua, no chorrea y es fácil de limpiar por dentro." },
  ],
  alfajores: [
    { title: "Dulce de leche en su punto", body: "No son empalagosos, el chocolate es de buena calidad y el relleno no se sale por los costados." },
    { title: "Llegaron frescos", body: "Pedí una docena para un evento y llegaron todos en perfecto estado, sin roturas." },
    { title: "Mi favorito para acompañar el mate", body: "Es el alfajor que más se acerca al sabor casero. Ya es un clásico en casa." },
  ],
  galletitas: [
    { title: "Textura crocante", body: "Se mantienen crocantes varios días después de abrir el paquete si las guardás bien cerradas." },
    { title: "Sabor tradicional", body: "El sabor es el de siempre, buena relación precio cantidad para compartir en la oficina." },
    { title: "Perfectas para la merienda", body: "Las pedí para acompañar el mate de la tarde, combinan bien y no son demasiado dulces." },
  ],
  accesorios: [
    { title: "Muy práctico para el día a día", body: "Le da un orden lindo a la mesa del mate, la terminación es prolija y resistente." },
    { title: "Buena calidad de materiales", body: "Se nota que no es un accesorio genérico, el detalle en las costuras y herrajes es premium." },
    { title: "Justo lo que buscaba", body: "Lo tenía en la wishlist hace rato, llegó bien embalado y cumple con lo esperado." },
  ],
};

const FAQ_TEMPLATES: Record<CategorySlug, FaqItem[]> = {
  yerbas: [
    { question: "¿Cuál es la fecha de elaboración del paquete?", answer: "Trabajamos con stock rotativo: la yerba que enviamos tiene siempre más de 8 meses de estacionamiento restante desde la fecha de despacho." },
    { question: "¿Cómo la tengo que cebar?", answer: "Recomendamos agua entre 70-80°C, sin hervir, para no quemar la yerba y conservar todas sus propiedades." },
  ],
  mates: [
    { question: "¿El mate viene curado?", answer: "Sí, todos nuestros mates de calabaza se entregan curados y listos para usar desde el primer cebado." },
    { question: "¿Cómo lo limpio después de usarlo?", answer: "Con agua tibia y un cepillo suave, sin detergente ni lavavajillas, dejando secar boca abajo." },
  ],
  bombillas: [
    { question: "¿Es apta para lavavajillas?", answer: "No recomendamos lavavajillas para preservar el filtro y la soldadura; lavar a mano con agua tibia." },
    { question: "¿De qué material está hecha?", answer: "Alpaca o acero quirúrgico según el modelo, ambos aptos para uso alimentario y libres de níquel expuesto." },
  ],
  termos: [
    { question: "¿Cuántas horas mantiene la temperatura?", answer: "Entre 12 y 24 horas según el modelo y la capacidad, manteniendo el agua apta para cebar durante toda la jornada." },
    { question: "¿Tiene garantía?", answer: "Sí, todos los termos cuentan con garantía oficial del fabricante contra defectos de fabricación." },
  ],
  alfajores: [
    { question: "¿Cuánto dura la vida útil del producto?", answer: "Entre 60 y 90 días desde la elaboración, indicado en el packaging de cada unidad." },
    { question: "¿Se pueden pedir por docena?", answer: "Sí, ofrecemos presentaciones individuales y por caja de 6 o 12 unidades." },
  ],
  galletitas: [
    { question: "¿Contienen conservantes artificiales?", answer: "Utilizamos las fórmulas originales de cada marca; el detalle de ingredientes figura en el packaging." },
    { question: "¿Cómo se conservan mejor?", answer: "En un recipiente hermético y al resguardo de la humedad, hasta 30 días después de abiertas." },
  ],
  accesorios: [
    { question: "¿Es apto para regalo?", answer: "Sí, podés agregar una nota personalizada en el checkout y lo despachamos en packaging premium." },
    { question: "¿Qué materiales usan?", answer: "Cuero sintético, algodón y metales tratados contra la corrosión, según el producto." },
  ],
};

export interface ProductInput {
  name: string;
  brandSlug: string;
  categorySlug: CategorySlug;
  price: number;
  compareAtPrice?: number;
  availability: Availability;
  stock: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  freeShipping?: boolean;
  tags?: string[];
  shortDescription: string;
  description: string;
  variants?: Array<{
    label: string;
    priceDelta?: number;
    availability?: Availability;
    stock?: number;
  }>;
  imageCount?: number;
  weightGrams?: number;
  origin?: string;
  /** Real photo URL for the first gallery slot — see docs/ADMIN_PANEL.md. */
  imageUrl?: string;
}

export function createProduct(input: ProductInput): Product {
  const slug = slugify(`${input.name}`);
  const h = hash(slug);
  const reviewCount = input.availability === "out_of_stock" ? h % 12 : 8 + (h % 140);
  const rating = Math.round((3.7 + (h % 13) / 10) * 10) / 10;

  const imageCount = input.imageCount ?? 3 + (h % 2);
  const images: ProductImage[] = Array.from({ length: imageCount }).map((_, i) => ({
    id: `${slug}-${i}`,
    alt: `${input.name} — foto ${i + 1}`,
    placeholder: `${input.categorySlug}-${(h + i) % 6}`,
    url: i === 0 ? input.imageUrl : undefined,
  }));

  const variants: ProductVariant[] = (input.variants ?? [{ label: "Único" }]).map((v, i) => ({
    id: `${slug}-var-${i}`,
    label: v.label,
    priceDelta: v.priceDelta,
    availability: v.availability ?? input.availability,
    stock: v.stock ?? input.stock,
    sku: `NDM-${slug.toUpperCase().slice(0, 6)}-${i + 1}`,
  }));

  const reviewTemplates = REVIEW_TEMPLATES[input.categorySlug];
  const reviews: Review[] = reviewTemplates.slice(0, reviewCount > 0 ? reviewTemplates.length : 0).map((t, i) => ({
    id: `${slug}-review-${i}`,
    author: REVIEW_AUTHORS[(h + i) % REVIEW_AUTHORS.length]!,
    rating: (4 + ((h + i) % 2)) as 4 | 5,
    date: new Date(2026, (h + i) % 12, 1 + ((h + i * 3) % 27)).toISOString().slice(0, 10),
    title: t.title,
    body: t.body,
    verified: true,
  }));

  return {
    id: slug,
    slug,
    name: input.name,
    brandSlug: input.brandSlug,
    categorySlug: input.categorySlug,
    tags: input.tags ?? [],
    shortDescription: input.shortDescription,
    description: input.description,
    images,
    price: input.price,
    compareAtPrice: input.compareAtPrice,
    installments:
      input.price >= 8000
        ? { count: input.price >= 30000 ? 12 : 6, interestFree: true }
        : undefined,
    availability: input.availability,
    stock: input.stock,
    variants,
    isNew: input.isNew ?? false,
    isBestSeller: input.isBestSeller ?? false,
    isFeatured: input.isFeatured ?? false,
    freeShipping: input.freeShipping ?? input.price >= 25000,
    rating,
    reviewCount,
    reviews,
    faqs: FAQ_TEMPLATES[input.categorySlug],
    relatedSlugs: [],
    weightGrams: input.weightGrams,
    origin: input.origin,
    sourceUrl: undefined,
    syncedAt: "2026-07-01T00:00:00.000Z",
  };
}

export function linkRelated(products: Product[]): Product[] {
  return products.map((p) => {
    const siblings = products
      .filter((other) => other.categorySlug === p.categorySlug && other.slug !== p.slug)
      .map((other) => other.slug);
    return { ...p, relatedSlugs: siblings.slice(0, 4) };
  });
}
