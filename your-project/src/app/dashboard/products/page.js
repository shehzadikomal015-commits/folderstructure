"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Download,
  RefreshCw,
  MoreVertical,
  Package,
  TrendingUp,
  TrendingDown,
  Star,
  AlertTriangle,
} from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { AIRecommendationCard } from "@/components/dashboard/AIRecommendationCard";
import { Timeline } from "@/components/dashboard/Timeline";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  topProducts,
  revenueTrend,
  revenueByChannel,
  activities,
} from "@/lib/dummyData";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const kpiStats = [
    {
      title: "Total Products",
      value: "25",
      growth: 5.2,
      trend: [20, 22, 21, 23, 24, 25, 25],
      icon: Package,
    },
    {
      title: "Top Seller",
      value: "Summer Dress",
      growth: 12.5,
      trend: [40, 45, 50, 55, 60, 65, 70],
      icon: TrendingUp,
    },
    {
      title: "Low Performers",
      value: "3",
      growth: -8.4,
      trend: [15, 14, 12, 10, 8, 7, 3],
      icon: TrendingDown,
    },
    {
      title: "Avg Conversion",
      value: "3.6%",
      growth: 2.1,
      trend: [30, 32, 31, 33, 34, 35, 36],
      icon: Star,
    },
  ];

  const aiInsight = {
    id: 1,
    title: "Optimize underperforming products",
    description:
      "AI detected 3 products with conversion rates below 2%. Pausing ads and adjusting pricing could recover approximately £620/month. Focus on Summer Dress and Denim Jacket bundles.",
    impact: "+£620/month",
    confidence: 85,
    actions: ["Pause low-performing ads", "Bundle products", "Adjust pricing"],
  };

  const categories = ["All", "Clothing", "Accessories", "Footwear", "Bags"];

  const filteredProducts = topProducts.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getGrowthBadge = (growth) => {
    if (growth > 0)
      return <Badge variant="success">+{growth}%</Badge>;
    if (growth < 0)
      return <Badge variant="danger">{growth}%</Badge>;
    return <Badge variant="muted">0%</Badge>;
  };

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
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Products
          </h1>
          <p className="text-muted mt-1">
            Manage your product catalog and track performance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="secondary" size="sm">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="ghost" size="sm">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {kpiStats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            growth={stat.growth}
            trend={stat.trend}
            icon={stat.icon}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl border border-border p-6"
      >
        <SectionHeader
          title="Top Products"
          subtitle="Best performing products by revenue"
          action={
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-xl border border-border bg-gray-50 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-xl border border-border bg-gray-50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          }
        />

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80">
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-4">
                  Product
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-4">
                  Units Sold
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-4">
                  Revenue
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-4">
                  Conversion
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-4">
                  Growth
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, idx) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          <Package className="h-5 w-5" />
                        </div>
                        <span className="font-medium text-foreground">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground font-medium">
                      {product.units}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground font-medium">
                      £{product.revenue.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground font-medium">
                      {product.conversion}%
                    </td>
                    <td className="px-6 py-4">
                      {getGrowthBadge(product.growth)}
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 rounded-lg hover:bg-gray-100 text-muted hover:text-foreground transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    <div className="flex flex-col items-center justify-center py-16 px-4">
                      <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <Package className="h-8 w-8 text-muted" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        No products found
                      </h3>
                      <p className="text-sm text-muted mb-6 max-w-sm text-center">
                        We could not find any products matching your search criteria. Try adjusting your filters.
                      </p>
                       <Button variant="outline" size="sm" onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
                         Clear Filters
                       </Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <AIRecommendationCard recommendation={aiInsight} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-6">
          <SectionHeader
            title="Revenue by Channel"
            subtitle="Where your revenue comes from"
          />
          <div className="space-y-4">
            {revenueByChannel.map((channel) => (
              <div
                key={channel.name}
                className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground">
                    {channel.name}
                  </p>
                  <p className="text-sm text-muted">
                    {channel.percent}% of total revenue
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground">
                    £{channel.value.toLocaleString()}
                  </p>
                  <p
                    className={`text-xs font-medium ${
                      channel.growth > 0
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {channel.growth > 0 ? "+" : ""}
                    {channel.growth}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-border p-6">
          <SectionHeader
            title="Recent Product Activity"
            subtitle="Latest updates related to products"
          />
          <Timeline items={activities} />
        </div>
      </motion.div>
    </motion.div>
  );
}
