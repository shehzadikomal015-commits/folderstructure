"use client";

import { motion } from "framer-motion";
import { DollarSign, TrendingUp, TrendingDown, CreditCard, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { revenueByChannel } from "@/lib/dummyData";

const chartData = [
  { day: "Mon", revenue: 4200, orders: 120 },
  { day: "Tue", revenue: 3800, orders: 105 },
  { day: "Wed", revenue: 5100, orders: 145 },
  { day: "Thu", revenue: 4600, orders: 130 },
  { day: "Fri", revenue: 6200, orders: 170 },
  { day: "Sat", revenue: 7500, orders: 210 },
  { day: "Sun", revenue: 6800, orders: 190 },
];

export default function RevenuePage() {
  const totalRevenue = chartData.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = chartData.reduce((sum, d) => sum + d.orders, 0);
  const avgOrderValue = totalRevenue / totalOrders;
  const maxRevenue = Math.max(...chartData.map((d) => d.revenue));

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
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Revenue
        </h1>
        <p className="text-muted mt-1">
          Track your revenue performance and trends over time.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatsCard
          title="Total Revenue"
          value={`£${totalRevenue.toLocaleString()}`}
          growth={12.5}
          trend={[30, 35, 32, 40, 38, 45, 50]}
          icon={DollarSign}
        />
        <StatsCard
          title="Total Orders"
          value={totalOrders.toString()}
          growth={8.2}
          trend={[20, 25, 22, 28, 30, 32, 35]}
          icon={TrendingUp}
        />
        <StatsCard
          title="Avg Order Value"
          value={`£${avgOrderValue.toFixed(2)}`}
          growth={5.1}
          trend={[40, 42, 41, 43, 44, 45, 46]}
          icon={CreditCard}
        />
        <StatsCard
          title="Conversion"
          value="2.8%"
          growth={-0.4}
          trend={[40, 38, 35, 32, 30, 28, 25]}
          icon={TrendingDown}
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
          title="Revenue Overview"
          subtitle="Daily revenue for the last 7 days"
        />
        <div className="h-80 flex items-end gap-2 sm:gap-4 mt-6">
          {chartData.map((item, idx) => (
            <motion.div
              key={item.day}
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: "auto", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                className="w-full bg-gradient-to-t from-primary to-secondary rounded-t-xl relative group cursor-pointer"
                style={{ height: "100%", transformOrigin: "bottom" }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  £{item.revenue.toLocaleString()}
                </div>
              </motion.div>
              <span className="text-xs text-muted font-medium">{item.day}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid lg:grid-cols-2 gap-8"
      >
        <div className="bg-white rounded-2xl border border-border p-6">
          <SectionHeader
            title="Revenue by Channel"
            subtitle="Where your revenue comes from"
          />
          <div className="space-y-4 mt-4">
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
                  <div className="flex items-center gap-1 justify-end">
                    {channel.growth > 0 ? (
                      <ArrowUpRight className="h-3 w-3 text-success" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-danger" />
                    )}
                    <p
                      className={`text-xs font-medium ${
                        channel.growth > 0 ? "text-success" : "text-danger"
                      }`}
                    >
                      {channel.growth > 0 ? "+" : ""}
                      {channel.growth}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-border p-6">
          <SectionHeader
            title="Orders Trend"
            subtitle="Daily orders for the last 7 days"
          />
          <div className="h-64 flex items-end gap-2 sm:gap-4 mt-4">
            {chartData.map((item, idx) => {
              const maxOrders = Math.max(...chartData.map((d) => d.orders));
              const heightPercent = (item.orders / maxOrders) * 100;
              return (
                <motion.div
                  key={item.day}
                  initial={{ height: 0, opacity: 0 }}
                  whileInView={{ height: `${heightPercent}%`, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div className="w-full bg-gradient-to-t from-secondary to-secondary-light rounded-t-xl relative group cursor-pointer h-full">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {item.orders} orders
                    </div>
                  </div>
                  <span className="text-xs text-muted font-medium">{item.day}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
