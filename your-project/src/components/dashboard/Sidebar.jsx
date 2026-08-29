"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  AlertTriangle,
  Lightbulb,
  Settings,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Store,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Logo } from "@/components/landing/Logo";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Revenue", href: "/dashboard/revenue", icon: DollarSign },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
  { name: "Products", href: "/dashboard/products", icon: Package },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Problems", href: "/dashboard/problems", icon: AlertTriangle },
  { name: "AI Insights", href: "/dashboard", icon: Lightbulb },
  { name: "Reports", href: "/dashboard", icon: BarChart3 },
  { name: "Settings", href: "/dashboard", icon: Settings },
  { name: "Store", href: "/store", icon: Store },
  { name: "My Orders", href: "/orders", icon: ShoppingCart },
];

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: "easeOut",
    },
  }),
};

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed left-0 top-0 h-screen bg-white border-r border-border z-30 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-border">
        {!collapsed ? (
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <Logo className="h-10 w-10" />
            <span className="font-bold text-foreground tracking-tight">RevenueAI</span>
          </Link>
        ) : (
          <Link href="/dashboard" className="flex items-center justify-center w-full">
            <Logo className="h-10 w-10" />
          </Link>
        )}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "p-1.5 rounded-lg hover:bg-gray-100 text-muted transition-colors",
            collapsed && "hidden"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </motion.button>
      </div>

      <nav className="flex flex-col gap-1 p-3 mt-3">
        {menuItems.map((item, idx) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <motion.div
              key={item.name}
              custom={idx}
              initial="hidden"
              animate="show"
              variants={itemVariants}
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-white shadow-sm shadow-primary/25"
                    : "text-muted hover:text-foreground hover:bg-gray-50"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </motion.div>
          );
        })}
      </nav>
    </motion.aside>
  );
}
