"use server";

import { createServerClient } from "@/lib/Supabase/server";
import { revalidatePath } from "next/cache";

function getFormString(formData: FormData, fieldName: string) {
  const value = formData.get(fieldName);
  return typeof value === "string" ? value : "";
}

export async function placeOrder(formData: FormData) {
  const supabase = await createServerClient();

  if (!supabase) {
    return { success: false, error: "Supabase not configured. Please set up environment variables." };
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "You must be logged in to place an order." };
  }

  const shippingName = getFormString(formData, "shippingName");
  const shippingEmail = getFormString(formData, "shippingEmail");
  const shippingPhone = getFormString(formData, "shippingPhone");
  const shippingAddress = getFormString(formData, "shippingAddress");
  const shippingCity = getFormString(formData, "shippingCity");
  const itemsJson = getFormString(formData, "items");

  if (!shippingName || !shippingEmail || !shippingAddress || !shippingCity) {
    return { success: false, error: "Please fill in all required shipping fields." };
  }

  const fullShippingAddress = `${shippingAddress}${shippingCity ? ", " + shippingCity : ""}`;

  let items;
  try {
    items = JSON.parse(itemsJson);
  } catch {
    return { success: false, error: "Invalid cart data." };
  }

  if (!items || items.length === 0) {
    return { success: false, error: "Your cart is empty." };
  }

  try {
    await supabase.from("customers").upsert({
      user_id: user.id,
      name: shippingName,
      email: shippingEmail,
      phone: shippingPhone,
      address: shippingAddress,
      city: shippingCity,
    });

    const { data, error } = await supabase.rpc("place_order", {
      p_user_id: user.id,
      p_shipping_name: shippingName,
      p_shipping_email: shippingEmail,
      p_shipping_phone: shippingPhone,
      p_shipping_address: fullShippingAddress,
      p_items: items,
    });

    if (error) {
      console.error("Order placement error:", error);
      return { success: false, error: error.message || "Failed to place order." };
    }

    revalidatePath("/orders");
    revalidatePath("/dashboard/orders");

    return { success: true, orderId: data };
  } catch (err) {
    console.error("Unexpected error placing order:", err);
    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function getMyOrders() {
  const supabase = await createServerClient();

  if (!supabase) {
    return { orders: [], error: "Supabase not configured" };
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { orders: [], error: "Not authenticated" };
  }

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    return { orders: [], error: error.message };
  }

  return { orders: data || [], error: null };
}

export async function getOrderById(orderId: string) {
  const supabase = await createServerClient();

  if (!supabase) {
    return { order: null, error: "Supabase not configured" };
  }

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
