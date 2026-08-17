"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Download,
  RefreshCw,
  MoreVertical,
  AlertTriangle,
  TrendingDown,
  DollarSign,
  Users,
  BarChart3,
} from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { AIRecommendationCard } from "@/components/dashboard/AIRecommendationCard";
import { ProblemCard } from "@/components/dashboard/ProblemCard";
import { Timeline } from "@/components/dashboard/Timeline";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  problems,
  revenueLeaks,
  aiRecommendations,
  activities,
} from "@/lib/dummyData";

export default function ProblemsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("All");

  const kpiStats = [
    {
      title: "Active Problems",
      value: "4",
      growth: -12.5,
      trend: [10, 12, 8, 6, 5, 4, 4],
      icon: AlertTriangle,
    },
    {
      title: "Revenue at Risk",
      value: "£3,150",
      growth: -8.4,
      trend: [50, 45, 40, 35, 32, 31, 31],
      icon: DollarSign,
    },
    {
      title: "Resolved This Month",
      value: "7",
      growth: 25.0,
      trend: [2, 3, 4, 5, 5, 6, 7],
      icon: BarChart3,
    },
    {
      title: "Avg Resolution Time",
      value: "2.4h",
      growth: -15.3,
      trend: [40, 35, 30, 28, 25, 24, 24],
      icon: TrendingDown,
    },
  ];

  const aiInsight = {
    id: 1,
    title: "Add free-shipping threshold to reduce checkout abandonment",
    description:
      "AI detected that 27 customers abandoned checkout after seeing shipping costs. Adding a free-shipping threshold of £50 could recover approximately £1,840/month and reduce cart abandonment by 24%.",
    impact: "+£1,840/month",
    confidence: 92,
    actions: [
      "Update shipping settings",
      "Add banner to product pages",
      "Notify existing customers",
    ],
  };

  const severityFilter = ["All", "High", "Medium", "Low"];

  const filteredProblems = problems.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity =
      selectedSeverity === "All" ||
      p.severity.charAt(0).toUpperCase() + p.severity.slice(1) ===
        selectedSeverity;
    return matchesSearch && matchesSeverity;
  });

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case "high":
        return <Badge variant="danger">High</Badge>;
      case "medium":
        return <Badge variant="warning">Medium</Badge>;
      case "low":
        return <Badge variant="muted">Low</Badge>;
      default:
        return <Badge variant="default">{severity}</Badge>;
    }
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
            Problems
          </h1>
          <p className="text-muted mt-1">
            Track, analyze, and resolve revenue-impacting problems.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="secondary" size="sm">
            <Download className="h-4 w-4" />
            Export Report
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
          title="All Problems"
          subtitle="Issues detected across your store"
          action={
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                <input
                  type="text"
                  placeholder="Search problems..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-xl border border-border bg-gray-50 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="px-4 py-2 rounded-xl border border-border bg-gray-50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              >
                {severityFilter.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          }
        />

        <div className="grid sm:grid-cols-2 gap-4">
          {filteredProblems.length > 0 ? (
            filteredProblems.map((problem, idx) => (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <ProblemCard problem={problem} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-2 flex flex-col items-center justify-center py-16 px-4">
              <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <AlertTriangle className="h-8 w-8 text-muted" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                No problems found
              </h3>
              <p className="text-sm text-muted mb-6 max-w-sm text-center">
                We could not find any problems matching your search criteria. Try adjusting your filters.
              </p>
              <Button variant="outline" size="sm" onClick={() => { setSearchQuery(""); setSelectedSeverity("All"); }}>
                Clear Filters
              </Button>
            </div>
          )}
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
            title="Revenue Leaks"
            subtitle="All identified revenue leak sources"
          />
          <div className="space-y-4">
            {revenueLeaks.map((leak) => (
              <div
                key={leak.id}
                className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-foreground">
                      {leak.title}
                    </p>
                    {getSeverityBadge(leak.severity)}
                  </div>
                  <p className="text-sm text-muted">{leak.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-danger">
                    {leak.loss}
                    <span className="text-sm font-normal text-muted">
                      {leak.lossPeriod}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-border p-6">
          <SectionHeader
            title="Problem Resolution Log"
            subtitle="Recent resolutions and updates"
          />
          <Timeline items={activities} />
        </div>
      </motion.div>
    </motion.div>
  );
}
