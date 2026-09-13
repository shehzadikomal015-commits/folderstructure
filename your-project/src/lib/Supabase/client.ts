import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";

if (!supabaseUrl || !supabasePublishableKey) {
  console.warn("Supabase environment variables not configured. Using mock client.");
}

export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey
);