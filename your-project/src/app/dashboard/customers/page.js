"use client";

import { motion } from "framer-motion";
import { Users, UserPlus, TrendingUp, DollarSign, MoreVertical, Star } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { customers } from "@/lib/dummyData";

export default function CustomersPage() {
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === "Active").length;
  const vipCustomers = customers.filter((c) => c.status === "VIP").length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);

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
          growth={15.3}
          trend={[15, 18, 20, 22, 25, 28, 30]}
          icon={Users}
        />
        <StatsCard
          title="Active"
          value={activeCustomers.toString()}
          growth={8.2}
          trend={[10, 12, 14, 15, 16, 17, 18]}
          icon={TrendingUp}
        />
        <StatsCard
          title="VIP Customers"
          value={vipCustomers.toString()}
          growth={25.0}
          trend={[5, 6, 7, 8, 9, 10, 11]}
          icon={Star}
        />
        <StatsCard
          title="Total Spent"
          value={`£${totalRevenue.toLocaleString()}`}
          growth={12.5}
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
              {customers.map((customer, idx) => (
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
                        {customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
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
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        customer.status === "VIP"
                          ? "primary"
                          : customer.status === "Active"
                          ? "success"
                          : "muted"
                      }
                    >
                      {customer.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted">
                    {customer.lastOrder}
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 rounded-lg hover:bg-gray-100 text-muted hover:text-foreground transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
