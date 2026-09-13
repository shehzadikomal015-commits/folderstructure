"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Store } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/components/store/CartProvider";
import { useAuth } from "@/components/auth/AuthProvider";
import { hoverLift, smoothTransition } from "@/lib/motionVariants";

export function StoreNavbar() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { user, hydrated } = useAuth();

  const isActive = (href) => pathname === href || pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/store" className="flex items-center gap-2">
            <Store className="h-6 w-6 text-primary" />
            <span className="font-bold text-foreground text-lg">Shop</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: "/store", label: "Products" },
              { href: "/cart", label: "Cart" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive(link.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted hover:text-foreground hover:bg-gray-50"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="storeNavIndicator"
                    className="absolute inset-0 rounded-xl bg-primary/10"
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  />
                )}
                {link.href === "/cart" && cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0, y: -10 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>
            ))}
            {hydrated && user && (
              <Link
                href="/orders"
                className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive("/orders")
                    ? "bg-primary/10 text-primary"
                    : "text-muted hover:text-foreground hover:bg-gray-50"
                }`}
              >
                My Orders
                {isActive("/orders") && (
                  <motion.div
                    layoutId="storeNavIndicator"
                    className="absolute inset-0 rounded-xl bg-primary/10"
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  />
                )}
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-3">
            {hydrated && user ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-muted hover:text-foreground hover:bg-gray-50 transition-all"
              >
                <User className="h-4 w-4" />
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 rounded-xl text-sm font-medium text-muted hover:text-foreground hover:bg-gray-50 transition-all"
              >
                Sign In
              </Link>
            )}
            <Link
              href="/cart"
              className="relative p-2 rounded-xl text-muted hover:text-foreground hover:bg-gray-50 transition-all"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0, y: -10 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
