"use client";

import { Bell, Search, Calendar } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/landing/Logo";

export function DashboardNavbar() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              type="text"
              placeholder="Search..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={cn(
                "pl-9 pr-4 py-2 rounded-xl text-sm border border-border bg-gray-50/50",
                "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white",
                "transition-all duration-200 w-48 sm:w-64"
              )}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50/50 border border-border">
            <Calendar className="h-4 w-4 text-muted" />
            <span className="text-sm text-muted font-medium">Last 30 days</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-xl hover:bg-gray-50 text-muted hover:text-foreground transition-colors"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full ring-2 ring-white" />
          </motion.button>

          <div className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-border">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shadow-md shadow-primary/25">
              DU
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-foreground">Demo User</p>
              <p className="text-xs text-muted">Store Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
