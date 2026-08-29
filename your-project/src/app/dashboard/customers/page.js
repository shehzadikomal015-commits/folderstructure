"use client";

import { motion } from "framer-motion";
import { Users, UserPlus, TrendingUp, DollarSign, MoreVertical, Star } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/Supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";

export default function CustomersPage() {
  const { user } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching customers:", error);
      setLoading(false);
      return;
    }

    setCustomers(data || []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("customers-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "customers" },
        () => {
          fetchCustomers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, fetchCustomers]);

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === "active").length;
  const vipCustomers = customers.filter((c) => c.status === "vip").length;
  const totalRevenue = customers.reduce((sum, c) => sum + Number(c.total_spent || 0), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
            Customers
          </h1>
          <p className="text-muted mt-1">
            Manage your customer base and track customer analytics.
          </p>
        </div>
        <Button size="sm">
          <UserPlus className="h-4 w-4" />
          Add Customer
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatsCard
          title="Total Customers"
          value={totalCustomers.toString()}
          growth={0}
          trend={[15, 18, 20, 22, 25, 28, 30]}
          icon={Users}
        />
        <StatsCard
          title="Active"
          value={activeCustomers.toString()}
          growth={0}
          trend={[10, 12, 14, 15, 16, 17, 18]}
          icon={TrendingUp}
        />
        <StatsCard
          title="VIP Customers"
          value={vipCustomers.toString()}
          growth={0}
          trend={[5, 6, 7, 8, 9, 10, 11]}
          icon={Star}
        />
        <StatsCard
          title="Total Spent"
          value={`£${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          growth={0}
          trend={[30, 35, 32, 40, 38, 45, 50]}
          icon={DollarSign}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl border border-border p-6"
      >
        <SectionHeader
          title="All Customers"
          subtitle="A list of all customers in your store"
        />
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80">
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-4">
                  Customer
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
                  Status
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-4">
                  Last Order
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {customers.length > 0 ? (
                customers.map((customer, idx) => (
                  <motion.tr
                    key={customer.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                          {customer.full_name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className="font-medium text-foreground">
                          {customer.full_name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground font-medium">
                      {customer.total_orders}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground font-medium">
                      £{Number(customer.total_spent).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          customer.status === "vip"
                            ? "primary"
                            : customer.status === "active"
                            ? "success"
                            : "muted"
                        }
                      >
                        {customer.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted">
                      {customer.last_order_at
                        ? new Date(customer.last_order_at).toLocaleDateString()
                        : "Never"}
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
                        <Users className="h-8 w-8 text-muted" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        No customers yet
                      </h3>
                      <p className="text-sm text-muted mb-6 max-w-sm text-center">
                        Customers will appear here after their first order.
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
