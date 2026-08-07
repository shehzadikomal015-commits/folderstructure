"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { LoginModal } from "./LoginModal";
import { SignupModal } from "./SignupModal";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "FAQ", href: "#faq" },
];

export function LandingNavbar({ onOpenLogin, onOpenSignup }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-gradient-to-r from-background/95 via-gray-50/90 to-background/95 backdrop-blur-2xl border-b border-primary/20 shadow-lg shadow-primary/10"
          : "bg-gradient-to-r from-background/80 via-gray-50/70 to-background/80 backdrop-blur-xl border-b border-gray-200"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 opacity-100" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group relative">
            <Logo className="h-12 w-12" />
             <span className="text-xl font-bold bg-gradient-to-r from-gray-900 via-primary-light to-secondary bg-clip-text text-transparent tracking-tight group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-500">
              RevenueAI
            </span>
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500 rounded-full" />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-all duration-300 rounded-xl hover:bg-gray-100 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-3/4 transition-all duration-300 rounded-full" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02, color: "#1E293B" }}
               whileTap={{ scale: 0.98 }}
               onClick={onOpenLogin}
               className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-all duration-300 rounded-xl hover:bg-gray-100"
            >
              Sign In
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(124,58,237,0.4)" }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenSignup}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-primary via-primary-light to-secondary bg-[length:200%_auto] animate-gradient rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
            >
              Get Started
            </motion.button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition-all"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-b from-background to-gray-50 backdrop-blur-2xl border-b border-gray-200"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setMobileOpen(false)}
                   className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-800/80 hover:text-gray-900 hover:bg-gray-100 transition-all"
                >
                  {link.name}
                </motion.a>
              ))}
               <div className="pt-4 border-t border-gray-200 space-y-2">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenLogin();
                  }}
                   className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-gray-800/80 hover:text-gray-900 hover:bg-gray-100 transition-all"
                >
                  Sign In
                </button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenSignup();
                  }}
                  className="w-full px-4 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-primary to-secondary"
                >
                  Get Started
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
