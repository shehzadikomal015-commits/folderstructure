"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ProblemCard } from "@/components/dashboard/ProblemCard";
import { AIRecommendationCard } from "@/components/dashboard/AIRecommendationCard";
import { Timeline } from "@/components/dashboard/Timeline";
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  Plus,
  Store,
  AlertCircle,
} from "lucide-react";
import {
  problems,
  aiRecommendations,
  activities,
} from "@/lib/dummyData";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { supabase } from "@/lib/Supabase/client";
import CreateStoreModal from "@/components/dashboard/CreateStoreModal";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [store, setStore] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [showCreateStore, setShowCreateStore] = useState(false);

  const fetchData = useCallback(async () => {
    if (!user) return;

    const { data: storeData, error: storeError } = await supabase
      .from("stores")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (storeError && storeError.code !== "PGRST116") {
      console.error("Error fetching store:", storeError);
    }

    setStore(storeData);

    if (!storeData) {
      setStats(null);
      setLoadingData(false);
      return;
    }

    const [ordersRes, productsRes, customersRes] = await Promise.all([
      supabase.from("orders").select("*", { count: "exact" }).eq("store_id", storeData.id),
      supabase.from("products").select("*", { count: "exact" }).eq("store_id", storeData.id),
      supabase.from("customers").select("*", { count: "exact" }),
    ]);

    const orders = ordersRes.data || [];
    const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total_amount || 0), 0);
    const totalOrders = orders.length;
    const totalProducts = productsRes.count || 0;
    const totalCustomers = customersRes.count || 0;

    setStats({
      revenue: { value: `£${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, count: totalRevenue },
      orders: { value: String(totalOrders), count: totalOrders },
      products: { value: String(totalProducts), count: totalProducts },
      customers: { value: String(totalCustomers), count: totalCustomers },
    });
    setLoadingData(false);
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, fetchData]);

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("dashboard-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        () => {
          fetchData();
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        () => {
          fetchData();
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "customers" },
        () => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, fetchData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const displayName =
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "there";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto space-y-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
          Welcome back, {displayName}
        </h1>
        <p className="text-muted mt-2 text-base">
          Here&apos;s what&apos;s happening with your store today.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!store && !loadingData ? (
          <motion.div
            key="no-store"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-3xl border border-border p-8 text-center"
          >
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Store className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Create Your Store</h2>
            <p className="text-muted mb-6 max-w-md mx-auto">
              Set up your store to start tracking orders, revenue, and customer activity. Each admin can create only one store.
            </p>
            <Button size="lg" onClick={() => setShowCreateStore(true)} className="gap-2">
              <Plus className="h-5 w-5" />
              Create Store
            </Button>
            <CreateStoreModal open={showCreateStore} onOpenChange={setShowCreateStore} onSuccess={fetchData} />
          </motion.div>
        ) : loadingData || !stats ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-3xl border border-border p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                <div className="h-8 bg-gray-200 rounded w-3/4" />
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <StatsCard
              title="Revenue"
              value={stats.revenue.value}
              growth={0}
              trend={[30, 35, 32, 40, 38, 45, 50]}
              icon={DollarSign}
            />
            <StatsCard
              title="Orders"
              value={stats.orders.value}
              growth={0}
              trend={[20, 25, 22, 28, 30, 32, 35]}
              icon={ShoppingCart}
            />
            <StatsCard
              title="Customers"
              value={stats.customers.value}
              growth={0}
              trend={[15, 18, 20, 22, 25, 28, 30]}
              icon={Users}
            />
            <StatsCard
              title="Products"
              value={stats.products.value}
              growth={0}
              trend={[40, 38, 35, 32, 30, 28, 25]}
              icon={TrendingUp}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {store && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SectionHeader
                title="Problems Detected"
                subtitle="Issues that need your attention"
                action={
                  <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/problems")}>
                    View All
                  </Button>
                }
              />
              <div className="grid sm:grid-cols-2 gap-4">
                {problems.slice(0, 4).map((problem, idx) => (
                  <motion.div
                    key={problem.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <ProblemCard problem={problem} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <AIRecommendationCard recommendation={aiRecommendations[0]} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl bg-white border border-border">
              <SectionHeader
                title="Recent Activity"
                subtitle="Latest updates from your store"
              />
              <Timeline items={activities} />
            </div>

            <div className="p-6 rounded-2xl bg-white border border-border">
              <h3 className="font-bold text-foreground mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                {[
                  { label: "Generate Revenue Report", href: "/dashboard/revenue" },
                  { label: "Export Customer Data", href: "/dashboard/customers" },
                  { label: "Review AI Insights", href: "/dashboard" },
                  { label: "Check Inventory", href: "/dashboard/products" },
                ].map((action) => (
                  <motion.button
                    key={action.label}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push(action.href)}
                    className="w-full text-left px-4 py-2.5 rounded-xl text-sm text-muted hover:text-foreground hover:bg-gray-50 transition-colors"
                  >
                    {action.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
