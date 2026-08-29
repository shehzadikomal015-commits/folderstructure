"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/Supabase/client";

export default function RealtimeRefresh({ tables = ["orders", "products", "customers"] }) {
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel("dashboard-realtime-refresh")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "*" },
        (payload) => {
          if (tables.includes(payload.table)) {
            router.refresh();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router, tables]);

  return null;
}
