"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Store } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/components/store/CartProvider";
import { useAuth } from "@/components/auth/AuthProvider";

export function StoreNavbar() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { user } = useAuth();

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
            <Link
              href="/store"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                isActive("/store")
                  ? "bg-primary/10 text-primary"
                  : "text-muted hover:text-foreground hover:bg-gray-50"
              }`}
            >
              Products
            </Link>
            <Link
              href="/cart"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all relative ${
                isActive("/cart")
                  ? "bg-primary/10 text-primary"
                  : "text-muted hover:text-foreground hover:bg-gray-50"
              }`}
            >
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            {user && (
              <Link
                href="/orders"
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive("/orders")
                    ? "bg-primary/10 text-primary"
                    : "text-muted hover:text-foreground hover:bg-gray-50"
                }`}
              >
                My Orders
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
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
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
