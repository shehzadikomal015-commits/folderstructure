import { createServerClient } from "@/lib/Supabase/server";
import { notFound } from "next/navigation";
import { OrderDetailClient } from "@/components/orders/OrderDetailClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const supabase = await createServerClient();
  if (!supabase) return { title: "Order Not Found" };
  
  const { order } = await getOrderById(supabase, params.id);
  if (!order) return { title: "Order Not Found" };
  return { title: `Order #${order.id.slice(0, 8).toUpperCase()}` };
}

async function getOrderById(supabase, orderId) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { order: null, error: "Not authenticated" };
  }

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items (
        id,
        product_id,
        quantity,
        price,
        created_at,
        products (
          id,
          name,
          image_url,
          category
        )
      )
      `
    )
    .eq("id", orderId)
    .eq("user_id", user.id)
    .single();

  if (error) {
    console.error("Error fetching order:", error);
    return { order: null, error: error.message };
  }

  return { order: data, error: null };
}

export default async function OrderDetailPage({ params }) {
  const supabase = await createServerClient();
  if (!supabase) {
    notFound();
  }

  const { order, error } = await getOrderById(supabase, params.id);

  if (error || !order) {
    notFound();
  }

  return <OrderDetailClient orderId={params.id} order={order} error={error} />;
}
