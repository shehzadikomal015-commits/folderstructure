import { createServerClient } from "@/lib/Supabase/server";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Package,
  Search,
  SlidersHorizontal,
  Download,
  RefreshCw,
  MoreVertical,
  Truck,
  Clock,
  CheckCircle,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardOrdersPage() {
  const supabase = await createServerClient();

  if (!supabase) {
    return (
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">
          <h2 className="text-xl font-bold text-yellow-800 mb-2">Supabase Not Configured</h2>
          <p className="text-yellow-700">Please configure your Supabase environment variables to view orders.</p>
        </div>
      </div>
    );
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/");
  }

  let allOrders = [];
  try {
    const { data: orders, error: ordersError } = await supabase
      .rpc("get_all_orders");

    if (ordersError) {
      console.error("RPC get_all_orders failed, falling back to direct query:", ordersError);
      const { data: fallbackOrders } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      allOrders = fallbackOrders || [];
    } else {
      allOrders = orders || [];
    }
  } catch (err) {
    console.error("Unexpected error fetching orders:", err);
    allOrders = [];
  }

  const kpiStats = [
    {
      title: "Total Orders",
      value: String(allOrders.length),
      growth: 8.2,
      trend: [20, 25, 22, 28, 30, 32, 35],
      icon: Package,
    },
    {
      title: "Pending",
      value: String(allOrders.filter((o) => o.status === "pending").length),
      growth: -2.1,
      trend: [10, 12, 8, 15, 11, 9, 12],
      icon: Clock,
    },
    {
      title: "Shipped",
      value: String(allOrders.filter((o) => o.status === "shipped").length),
      growth: 15.3,
      trend: [15, 18, 20, 22, 19, 24, 24],
      icon: Truck,
    },
    {
      title: "Delivered",
      value: String(allOrders.filter((o) => o.status === "delivered").length),
      growth: 22.5,
      trend: [25, 28, 30, 32, 35, 40, 45],
      icon: CheckCircle,
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge variant="warning">Pending</Badge>;
      case "confirmed":
        return <Badge variant="info">Confirmed</Badge>;
      case "shipped":
        return <Badge variant="primary">Shipped</Badge>;
      case "delivered":
        return <Badge variant="success">Delivered</Badge>;
      case "cancelled":
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
      className="max-w-7xl mx-auto space-y-6 sm:space-y-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Orders
          </h1>
          <p className="text-sm text-muted mt-1">
            Manage and track all customer orders in one place.
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        {kpiStats.map((stat) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl border border-border p-4 sm:p-6"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <p className="text-xs sm:text-sm font-medium text-muted">{stat.title}</p>
              <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 text-muted" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs sm:text-sm text-muted mt-1">
              <span className={stat.growth > 0 ? "text-success" : "text-danger"}>
                {stat.growth > 0 ? "+" : ""}{stat.growth}%
              </span>{" "}
              from last month
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl border border-border p-4 sm:p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-foreground">All Orders</h2>
            <p className="text-xs sm:text-sm text-muted">A list of all orders in your store</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-9 pr-4 py-2 rounded-xl border border-border bg-gray-50 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <select
              className="px-4 py-2 rounded-xl border border-border bg-gray-50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            >
              <option value="All">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80">
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-4 sm:px-6 py-3 sm:py-4">
                  Order ID
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-4 sm:px-6 py-3 sm:py-4">
                  Customer
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-4 sm:px-6 py-3 sm:py-4">
                  Date
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-4 sm:px-6 py-3 sm:py-4">
                  Total
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-4 sm:px-6 py-3 sm:py-4">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-4 sm:px-6 py-3 sm:py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {allOrders.length > 0 ? (
                allOrders.map((order, idx) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium text-foreground">
                      {order.id.slice(0, 8).toUpperCase()}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {order.shipping_name}
                        </p>
                        <p className="text-xs text-muted">{order.shipping_email}</p>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-muted">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium text-foreground">
                      £{Number(order.total_amount).toFixed(2)}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 text-muted hover:text-foreground transition-colors">
                        <MoreVertical className="h-3 w-3 sm:h-4 sm:w-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>
                    <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4">
                      <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <Package className="h-7 w-7 sm:h-8 sm:w-8 text-muted" />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">
                        No orders found
                      </h3>
                      <p className="text-xs sm:text-sm text-muted mb-5 sm:mb-6 max-w-sm text-center">
                        We could not find any orders matching your search criteria. Try adjusting your filters.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
