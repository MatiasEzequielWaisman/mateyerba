export type CategorySlug =
  | "yerbas"
  | "mates"
  | "bombillas"
  | "termos"
  | "alfajores"
  | "galletitas"
  | "accesorios";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  /** Tailwind gradient classes used for the category tile artwork. */
  gradient: string;
  icon: "leaf" | "cup" | "straw" | "flask" | "cookie" | "wheat" | "package";
}

export interface Brand {
  slug: string;
  name: string;
  description: string;
  featured: boolean;
}

export type Availability = "in_stock" | "low_stock" | "out_of_stock";

export interface ProductVariant {
  id: string;
  /** e.g. "500 g", "1 kg", "Acero", "Palo santo" */
  label: string;
  /** Optional differential vs. base price, in ARS. */
  priceDelta?: number;
  availability: Availability;
  stock: number;
  sku: string;
}

export interface ProductImage {
  id: string;
  alt: string;
  /** Deterministic placeholder key used to render generated artwork instead of a photograph. */
  placeholder: string;
}

export interface Review {
  id: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;
  title: string;
  body: string;
  verified: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brandSlug: string;
  categorySlug: CategorySlug;
  tags: string[];
  shortDescription: string;
  description: string;
  images: ProductImage[];
  price: number;
  compareAtPrice?: number;
  installments?: { count: number; interestFree: boolean };
  availability: Availability;
  stock: number;
  variants: ProductVariant[];
  isNew: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
  freeShipping: boolean;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  faqs: FaqItem[];
  relatedSlugs: string[];
  weightGrams?: number;
  origin?: string;
  sourceUrl?: string;
  syncedAt: string;
}

export interface ProductFilters {
  categories: CategorySlug[];
  brands: string[];
  priceMin?: number;
  priceMax?: number;
  availability?: Availability[];
  search?: string;
}

export type SortOption =
  | "featured"
  | "best_selling"
  | "price_asc"
  | "price_desc"
  | "newest";
