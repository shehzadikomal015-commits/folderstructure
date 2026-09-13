"use server";

import { createServerClient } from "@/lib/Supabase/server";
import { revalidatePath } from "next/cache";

export async function getMyStore() {
  const supabase = await createServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { store: null, error: "Not authenticated" };
  }

  const { data, error } = await supabase
    .from("stores")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    return { store: null, error: null };
  }

  return { store: data, error: null };
}

export async function createStore(formData: FormData) {
  const supabase = await createServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "You must be logged in to create a store." };
  }

  const existingStore = await getMyStore();
  if (existingStore.store) {
    return { success: false, error: "You already have a store. Each admin can only have one store." };
  }

  const name = formData.get("name")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const currency = formData.get("currency")?.toString().trim() || "£";

  if (!name) {
    return { success: false, error: "Store name is required." };
  }

  const { data, error } = await supabase
    .from("stores")
    .insert({
      user_id: user.id,
      name,
      description: description || "",
      currency: currency || "£",
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating store:", error);
    return { success: false, error: error.message || "Failed to create store." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/settings");

  return { success: true, store: data };
}

export async function updateStore(formData: FormData) {
  const supabase = await createServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "You must be logged in to update a store." };
  }

  const { data: existingStore, error: fetchError } = await supabase
    .from("stores")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (fetchError || !existingStore) {
    return { success: false, error: "Store not found." };
  }

  const name = formData.get("name")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const currency = formData.get("currency")?.toString().trim();
  const isActive = formData.get("isActive") === "true";

  if (!name) {
    return { success: false, error: "Store name is required." };
  }

  const { data, error } = await supabase
    .from("stores")
    .update({
      name,
      description: description || "",
      currency: currency || "£",
      is_active: isActive,
    })
    .eq("id", existingStore.id)
    .select()
    .single();

  if (error) {
    console.error("Error updating store:", error);
    return { success: false, error: error.message || "Failed to update store." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/settings");

  return { success: true, store: data };
}

export async function getDashboardStats() {
  const supabase = await createServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { stats: null, error: "Not authenticated" };
  }

  const [ordersResult, productsResult, customersResult] = await Promise.all([
    supabase.from("orders").select("*", { count: "exact", head: false }),
    supabase.from("products").select("*", { count: "exact", head: false }),
    supabase.from("customers").select("*", { count: "exact", head: false }),
  ]);

  if (ordersResult.error) {
    console.error("Error fetching orders:", ordersResult.error);
  }

  const orders = ordersResult.data || [];
  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total_amount || 0), 0);
  const totalOrders = orders.length;
  const totalProducts = productsResult.data?.length || 0;
  const totalCustomers = customersResult.data?.length || 0;

  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const shippedOrders = orders.filter((o) => o.status === "shipped").length;
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length;

  const stats = {
    revenue: { value: `£${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, count: totalRevenue },
    orders: { value: String(totalOrders), count: totalOrders },
    products: { value: String(totalProducts), count: totalProducts },
    customers: { value: String(totalCustomers), count: totalCustomers },
    pending: pendingOrders,
    shipped: shippedOrders,
    delivered: deliveredOrders,
  };

  return { stats, error: null };
}
