import { EditProductView } from "@/components/admin/edit-product-view";

export default function EditProductPage({ params }: { params: { slug: string } }) {
  return <EditProductView slug={params.slug} />;
}
