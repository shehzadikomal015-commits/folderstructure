"use client";

import { useState } from "react";
import {
  Users,
  UserCheck,
  UserPlus,
  Crown,
  Search,
  SlidersHorizontal,
  Download,
  RefreshCw,
  MoreVertical,
} from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { AIRecommendationCard } from "@/components/dashboard/AIRecommendationCard";
import { Timeline } from "@/components/dashboard/Timeline";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { customers, activities } from "@/lib/dummyData";

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const kpiStats = [
    {
      title: "Total Customers",
      value: "380",
      growth: 15.3,
      trend: [15, 18, 20, 22, 25, 28, 30],
      icon: Users,
    },
    {
      title: "Active Customers",
      value: "312",
      growth: 12.1,
      trend: [20, 22, 24, 26, 28, 30, 32],
      icon: UserCheck,
    },
    {
      title: "New Customers This Month",
      value: "48",
      growth: 8.4,
      trend: [10, 12, 15, 14, 18, 20, 22],
      icon: UserPlus,
    },
    {
      title: "VIP Customers",
      value: "56",
      growth: 22.5,
      trend: [5, 8, 10, 12, 15, 18, 20],
      icon: Crown,
    },
  ];

  const insights = [
    { label: "Returning Customers", value: "65%", color: "bg-primary", light: "bg-primary/10" },
    { label: "First-time Buyers", value: "25%", color: "bg-secondary", light: "bg-secondary/10" },
    { label: "Repeat Purchase Rate", value: "42%", color: "bg-success", light: "bg-success/10" },
    { label: "Avg Order Value", value: "£64.50", color: "bg-warning", light: "bg-warning/10" },
  ];

  const aiInsight = {
    id: 1,
    title: "Boost VIP Customer Retention",
    description:
      "AI detected that your 56 VIP customers generate 68% of total revenue. Launching an exclusive loyalty program could increase their lifetime value by an estimated 35%. Focus on personalised recommendations and early access to new products.",
    impact: "+£8,400/month",
    confidence: 91,
    actions: ["Create VIP loyalty tier", "Launch personalised recommendations", "Add early-access benefits"],
  };

  const segments = [
    {
      title: "VIP",
      description: "High-value repeat buyers",
      count: 56,
      percent: 15,
      color: "bg-primary",
      light: "bg-primary/10",
      text: "text-primary",
    },
    {
      title: "Regular",
      description: "Consistent purchasers",
      count: 186,
      percent: 49,
      color: "bg-info",
      light: "bg-info/10",
      text: "text-info",
    },
    {
      title: "New",
      description: "First-time buyers",
      count: 95,
      percent: 25,
      color: "bg-success",
      light: "bg-success/10",
      text: "text-success",
    },
    {
      title: "At-risk",
      description: "Inactive 90+ days",
      count: 43,
      percent: 11,
      color: "bg-danger",
      light: "bg-danger/10",
      text: "text-danger",
    },
  ];

  const statusFilter = ["All", "Active", "Inactive", "VIP"];

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "All" || c.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "VIP":
        return <Badge variant="primary">VIP</Badge>;
      case "Active":
        return <Badge variant="success">Active</Badge>;
      case "Inactive":
        return <Badge variant="muted">Inactive</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Customers
          </h1>
          <p className="text-muted mt-1">
            View and manage customer information.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="h-4 w-4" />
            Date Filter
          </Button>
          <Button variant="secondary" size="sm">
            <Download className="h-4 w-4" />
            Export Customers
          </Button>
          <Button variant="ghost" size="sm">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <SectionHeader
          title="All Customers"
          subtitle="A list of all customers in your store"
          action={
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-xl border border-border bg-gray-50 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 rounded-xl border border-border bg-gray-50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              >
                {statusFilter.map((s) => (
                  <option key={s} value={s}>
                    {s}
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
                  Customer Name
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-4">
                  Email
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-4">
                  Total Orders
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-4">
                  Total Spent
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-4">
                  Last Order
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-4">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                          {customer.name.charAt(0)}
                        </div>
                        <span className="font-medium text-foreground">
                          {customer.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground font-medium">
                      {customer.totalOrders}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground font-medium">
                      £{customer.totalSpent.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted">
                      {customer.lastOrder}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(customer.status)}
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 rounded-lg hover:bg-gray-100 text-muted hover:text-foreground transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7}>
                    <div className="flex flex-col items-center justify-center py-16 px-4">
                      <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <Users className="h-8 w-8 text-muted" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        No customers found
                      </h3>
                      <p className="text-sm text-muted mb-6 max-w-sm text-center">
                        We couldn&apos;t find any customers matching your search criteria. Try adjusting your filters or search query.
                      </p>
                      <Button variant="outline" size="sm">
                        Clear Filters
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Insights */}
      <div>
        <SectionHeader
          title="Customer Insights"
          subtitle="Key metrics about your customer base"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {insights.map((insight) => (
            <div
              key={insight.label}
              className="bg-white rounded-2xl border border-border p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-muted">{insight.label}</p>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-muted">
                  {insight.value.includes("£") ? "Currency" : "Metric"}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground mb-4">
                {insight.value}
              </p>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full ${insight.color} transition-all duration-500`}
                  style={{
                    width:
                      insight.value.includes("£")
                        ? "64%"
                        : insight.value.includes("%")
                        ? insight.value
                        : "0%",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Customer Insights */}
      <AIRecommendationCard recommendation={aiInsight} />

      {/* Recent Activity & Customer Segmentation */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Customer Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-6">
          <SectionHeader
            title="Recent Customer Activity"
            subtitle="Latest actions from your customers"
          />
          <Timeline items={activities} />
        </div>

        {/* Customer Segmentation */}
        <div className="bg-white rounded-2xl border border-border p-6">
          <SectionHeader
            title="Customer Segments"
            subtitle="Breakdown by customer behaviour"
          />
          <div className="space-y-5">
            {segments.map((segment) => (
              <div
                key={segment.title}
                className="group hover:bg-gray-50 rounded-xl p-3 transition-colors duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-3 w-3 rounded-full ${segment.color}`}
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {segment.title}
                      </p>
                      <p className="text-xs text-muted">
                        {segment.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">
                      {segment.count}
                    </p>
                    <p className="text-xs text-muted">{segment.percent}%</p>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${segment.color} transition-all duration-500`}
                    style={{ width: `${segment.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
