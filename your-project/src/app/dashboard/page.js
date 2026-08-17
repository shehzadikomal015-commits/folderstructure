"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ProblemCard } from "@/components/dashboard/ProblemCard";
import { AIRecommendationCard } from "@/components/dashboard/AIRecommendationCard";
import { Timeline } from "@/components/dashboard/Timeline";
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
} from "lucide-react";
import {
  kpiData,
  problems,
  aiRecommendations,
  activities,
} from "@/lib/dummyData";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatsCard
          title="Revenue"
          value="£24,500"
          growth={12.5}
          trend={kpiData.revenue.trend}
          icon={DollarSign}
        />
        <StatsCard
          title="Orders"
          value="500"
          growth={8.2}
          trend={kpiData.orders.trend}
          icon={ShoppingCart}
        />
        <StatsCard
          title="Customers"
          value="380"
          growth={15.3}
          trend={kpiData.customers.trend}
          icon={Users}
        />
        <StatsCard
          title="Conversion"
          value="2.8%"
          growth={-0.4}
          trend={kpiData.conversion.trend}
          icon={TrendingUp}
        />
      </motion.div>

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
              {problems.map((problem, idx) => (
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
    </motion.div>
  );
}
