"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { getMyOrders } from "@/app/actions";
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
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { StoreNavbar } from "@/components/store/StoreNavbar";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    async function loadOrders() {
      const result = await getMyOrders();
      if (result.error) {
        setError(result.error);
      } else {
        setOrders(result.orders);
      }
      setLoading(false);
    }
    loadOrders();
  }, []);

  const kpiStats = [
    {
      title: "Total Orders",
      value: String(orders.length),
      growth: 8.2,
      trend: [20, 25, 22, 28, 30, 32, 35],
      icon: Package,
    },
    {
      title: "Pending",
      value: String(orders.filter((o) => o.status === "pending").length),
      growth: -2.1,
      trend: [10, 12, 8, 15, 11, 9, 12],
      icon: Clock,
    },
    {
      title: "Shipped",
      value: String(orders.filter((o) => o.status === "shipped").length),
      growth: 15.3,
      trend: [15, 18, 20, 22, 19, 24, 24],
      icon: Truck,
    },
    {
      title: "Delivered",
      value: String(orders.filter((o) => o.status === "delivered").length),
      growth: 22.5,
      trend: [25, 28, 30, 32, 35, 40, 45],
      icon: CheckCircle,
    },
  ];

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.shipping_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "All" || o.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

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
    <div className="min-h-screen bg-gray-50/50">
      <StoreNavbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">My Orders</h1>
          <p className="text-sm text-muted mt-1">Track and manage your orders</p>
        </motion.div>

        {loading && (
          <div className="flex items-center justify-center py-20 sm:py-24">
            <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-danger-light border border-danger/20 rounded-2xl p-4 sm:p-6 mb-6"
          >
            <p className="text-sm text-danger font-medium">{error}</p>
          </motion.div>
        )}

        {!loading && orders.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 sm:py-24"
          >
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5 sm:mb-6">
              <Package className="h-8 w-8 sm:h-10 sm:w-10 text-muted" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">No orders yet</h3>
            <p className="text-sm text-muted mb-6 sm:mb-8 max-w-sm mx-auto">
              When you place an order, it will appear here.
            </p>
            <Button size="lg" onClick={() => router.push("/store")}>Start Shopping</Button>
          </motion.div>
        )}

        {!loading && orders.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
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
                </motion.div>
              ))}
            </div>

            <div className="space-y-4">
              {filteredOrders.map((order, idx) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-white rounded-2xl border border-border p-4 sm:p-6 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer"
                  onClick={() => router.push(`/orders/${order.id}`)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Package className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-sm sm:text-base">
                          Order #{order.id.slice(0, 8).toUpperCase()}
                        </p>
                        <p className="text-xs sm:text-sm text-muted">
                          {new Date(order.created_at).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="text-right">
                        <p className="text-base sm:text-lg font-bold text-foreground">
                          £{Number(order.total_amount).toFixed(2)}
                        </p>
                        {getStatusBadge(order.status)}
                      </div>
                      <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5 text-muted" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
