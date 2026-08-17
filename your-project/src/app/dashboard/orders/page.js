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
  Truck,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { AIRecommendationCard } from "@/components/dashboard/AIRecommendationCard";
import { Timeline } from "@/components/dashboard/Timeline";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { orders, orderStatuses, activities, orderAlerts } from "@/lib/dummyData";

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const kpiStats = [
    {
      title: "Total Orders",
      value: "500",
      growth: 8.2,
      trend: [20, 25, 22, 28, 30, 32, 35],
      icon: Package,
    },
    {
      title: "Pending",
      value: "12",
      growth: -2.1,
      trend: [10, 12, 8, 15, 11, 9, 12],
      icon: Clock,
    },
    {
      title: "Shipped",
      value: "24",
      growth: 15.3,
      trend: [15, 18, 20, 22, 19, 24, 24],
      icon: Truck,
    },
    {
      title: "Delivered",
      value: "45",
      growth: 22.5,
      trend: [25, 28, 30, 32, 35, 40, 45],
      icon: CheckCircle,
    },
  ];

  const aiInsight = {
    id: 1,
    title: "High-value order fulfillment delay",
    description:
      "AI detected that 3 high-value orders worth £920 are pending for more than 2 hours. Expediting these orders could prevent customer dissatisfaction and potential refunds.",
    impact: "+£920/month",
    confidence: 88,
    actions: ["Expedite pending orders", "Notify customers", "Review fulfillment SLAs"],
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "All" ||
      o.paymentStatus === selectedStatus ||
      o.fulfillmentStatus === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Paid":
        return <Badge variant="success">Paid</Badge>;
      case "Pending":
        return <Badge variant="warning">Pending</Badge>;
      case "Failed":
        return <Badge variant="danger">Failed</Badge>;
      case "Refunded":
        return <Badge variant="muted">Refunded</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const getFulfillmentBadge = (status) => {
    switch (status) {
      case "Shipped":
        return <Badge variant="primary">Shipped</Badge>;
      case "Processing":
        return <Badge variant="warning">Processing</Badge>;
      case "Delivered":
        return <Badge variant="success">Delivered</Badge>;
      case "Cancelled":
        return <Badge variant="danger">Cancelled</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
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
            Orders
          </h1>
          <p className="text-muted mt-1">
            Manage and track all customer orders in one place.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
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
          title="All Orders"
          subtitle="A list of all orders in your store"
          action={
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                <input
                  type="text"
                  placeholder="Search orders..."
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
                <option value="All">All Statuses</option>
                {orderStatuses.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name}
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
                  Order ID
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-4">
                  Customer
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-4">
                  Date
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-4">
                  Total
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-4">
                  Payment
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-4">
                  Fulfillment
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, idx) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      {order.id}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {order.customer}
                        </p>
                        <p className="text-xs text-muted">{order.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      £{order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(order.paymentStatus)}
                    </td>
                    <td className="px-6 py-4">
                      {getFulfillmentBadge(order.fulfillmentStatus)}
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
                  <td colSpan={7}>
                    <div className="flex flex-col items-center justify-center py-16 px-4">
                      <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <Package className="h-8 w-8 text-muted" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        No orders found
                      </h3>
                      <p className="text-sm text-muted mb-6 max-w-sm text-center">
                        We could not find any orders matching your search criteria. Try adjusting your filters.
                      </p>
                       <Button variant="outline" size="sm" onClick={() => { setSearchQuery(""); setSelectedStatus("All"); }}>
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
            title="Order Alerts"
            subtitle="Recent alerts requiring your attention"
          />
          <Timeline items={orderAlerts} />
        </div>
        <div className="bg-white rounded-2xl border border-border p-6">
          <SectionHeader
            title="Order Status Breakdown"
            subtitle="Current distribution by status"
          />
          <div className="space-y-4">
            {orderStatuses.map((status) => (
              <div
                key={status.name}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-3 w-3 rounded-full ${
                      status.color === "warning"
                        ? "bg-warning"
                        : status.color === "info"
                        ? "bg-info"
                        : status.color === "primary"
                        ? "bg-primary"
                        : status.color === "success"
                        ? "bg-success"
                        : status.color === "danger"
                        ? "bg-danger"
                        : "bg-muted"
                    }`}
                  />
                  <span className="text-sm font-medium text-foreground">
                    {status.name}
                  </span>
                </div>
                <span className="text-sm font-bold text-foreground">
                  {status.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
