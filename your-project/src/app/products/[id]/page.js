import { createServerClient } from "@/lib/Supabase/server";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/store/ProductDetailClient";

export async function generateMetadata({ params }) {
  const supabase = await createServerClient();
  if (!supabase) return { title: "Product Not Found" };
  
  const product = await getProductById(supabase, params.id);
  if (!product) return { title: "Product Not Found" };
  return { title: product.name };
}

async function getProductById(supabase, id) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return data;
}

export default async function ProductPage({ params }) {
  const supabase = await createServerClient();
  if (!supabase) {
    notFound();
  }

  const product = await getProductById(supabase, params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
