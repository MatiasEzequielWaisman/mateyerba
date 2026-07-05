import type { Metadata } from "next";
import { WishlistView } from "@/components/wishlist/wishlist-view";

export const metadata: Metadata = { title: "Mis favoritos", robots: { index: false, follow: true } };

export default function FavoritosPage() {
  return <WishlistView />;
}
