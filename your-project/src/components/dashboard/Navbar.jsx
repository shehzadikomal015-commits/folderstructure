"use client";

import Link from "next/link";
import { Bell, Search, Calendar, LogOut, ChevronDown, User, Store, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/landing/Logo";
import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter } from "next/navigation";

export function DashboardNavbar() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const displayName =
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "User";

  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const userEmail = user?.email || "";

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-4">
          <Link href="/store" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
            View Store
          </Link>
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

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-border hover:bg-gray-50 rounded-xl px-3 py-1.5 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shadow-md shadow-primary/25">
                {initials}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-foreground">{displayName}</p>
                <p className="text-xs text-muted">{userEmail}</p>
              </div>
              <ChevronDown className={cn("h-4 w-4 text-muted transition-transform duration-200 hidden sm:block", dropdownOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-border shadow-xl shadow-black/10 overflow-hidden"
                >
                  <div className="p-3 border-b border-border">
                    <p className="text-sm font-semibold text-foreground">{displayName}</p>
                    <p className="text-xs text-muted truncate">{userEmail}</p>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={() => { router.push("/store"); setDropdownOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-gray-50 transition-colors"
                    >
                      <Store className="h-4 w-4" />
                      <span>View Store</span>
                    </button>
                    <button
                      onClick={() => { router.push("/orders"); setDropdownOpen(false); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-foreground hover:bg-gray-50 transition-colors"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>My Orders</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-danger hover:bg-danger-light transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
