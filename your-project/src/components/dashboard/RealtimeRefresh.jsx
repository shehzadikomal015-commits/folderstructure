"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/Supabase/client";

export default function RealtimeRefresh({ tables = ["orders", "products", "customers"] }) {
  const router = useRouter();

  useEffect(() => {
    if (!supabase) return;

    const channel = supabase
      .channel("dashboard-realtime-refresh")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: tables[0] },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    // Subscribe to additional tables
    const additionalChannels = tables.slice(1).map((table) =>
      supabase
        .channel(`dashboard-realtime-${table}`)
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table },
          () => {
            router.refresh();
          }
        )
        .subscribe()
    );

    return () => {
      supabase.removeChannel(channel);
      additionalChannels.forEach((ch) => supabase.removeChannel(ch));
    };
  }, [router, tables]);

  return null;
}
