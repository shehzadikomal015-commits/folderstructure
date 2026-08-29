import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";
import { ProductDetailClient } from "@/components/store/ProductDetailClient";

export async function generateMetadata({ params }) {
  const product = await getProductById(params.id);
  if (!product) return { title: "Product Not Found" };
  return { title: product.name };
}

export default async function ProductPage({ params }) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
