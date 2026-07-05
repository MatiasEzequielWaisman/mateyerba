import type { Product, ProductFilters, SortOption } from "@/lib/types";

export { products, getProductBySlug, getFeaturedProducts, getNewProducts, getBestSellerProducts, getOnSaleProducts, getProductsByCategory } from "./products";
export { categories, getCategoryBySlug } from "./categories";
export { brands, getBrandBySlug } from "./brands";

export function filterProducts(products: Product[], filters: Partial<ProductFilters>): Product[] {
  return products.filter((p) => {
    if (filters.categories?.length && !filters.categories.includes(p.categorySlug)) return false;
    if (filters.brands?.length && !filters.brands.includes(p.brandSlug)) return false;
    if (filters.priceMin != null && p.price < filters.priceMin) return false;
    if (filters.priceMax != null && p.price > filters.priceMax) return false;
    if (filters.availability?.length && !filters.availability.includes(p.availability)) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const haystack = `${p.name} ${p.shortDescription} ${p.tags.join(" ")}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const copy = [...products];
  switch (sort) {
    case "price_asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price_desc":
      return copy.sort((a, b) => b.price - a.price);
    case "newest":
      return copy.sort((a, b) => Number(b.isNew) - Number(a.isNew) || b.syncedAt.localeCompare(a.syncedAt));
    case "best_selling":
      return copy.sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller) || b.reviewCount - a.reviewCount);
    case "featured":
    default:
      return copy.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
  }
}
