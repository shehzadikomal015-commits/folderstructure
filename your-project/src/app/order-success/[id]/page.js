import { createServerClient } from "@/lib/Supabase/server";
import { notFound } from "next/navigation";
import { OrderSuccessClient } from "./OrderSuccessClient";

export default async function OrderSuccessPage({ params }) {
  const supabase = await createServerClient();

  if (!supabase) {
    notFound();
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    notFound();
  }

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single();

  if (orderError || !order) {
    notFound();
  }

  return <OrderSuccessClient order={order} />;
}
