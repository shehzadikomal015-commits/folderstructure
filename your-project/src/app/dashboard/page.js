"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
          Welcome back
        </h1>
        <p className="text-muted mt-2 text-base">
          Here&apos;s what&apos;s happening with your store today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <SectionHeader
              title="Problems Detected"
              subtitle="Issues that need your attention"
              action={
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              }
            />
            <div className="grid sm:grid-cols-2 gap-4">
              {problems.map((problem) => (
                <ProblemCard key={problem.id} problem={problem} />
              ))}
            </div>
          </div>

          <AIRecommendationCard recommendation={aiRecommendations[0]} />
        </div>

        <div className="space-y-6">
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
                "Generate Revenue Report",
                "Export Customer Data",
                "Review AI Insights",
                "Check Inventory",
              ].map((action) => (
                <button
                  key={action}
                  className="w-full text-left px-4 py-2.5 rounded-xl text-sm text-muted hover:text-foreground hover:bg-gray-50 transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
