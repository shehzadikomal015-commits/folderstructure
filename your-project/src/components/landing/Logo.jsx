"use client";

import { motion } from "framer-motion";

export function Logo({ className = "h-12 w-12" }) {
  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      whileHover={{ scale: 1.05, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <div className="relative">
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
            <linearGradient id="logoGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E11D48" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#475569" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <circle cx="18" cy="18" r="16" fill="url(#logoGlow)" />
          <path
            d="M18 4L32 10V26L18 32L4 26V10L18 4Z"
            fill="url(#logoGradient)"
            opacity="0.2"
          />
          <path
            d="M18 8L28 12V24L18 28L8 24V12L18 8Z"
            fill="url(#logoGradient)"
            opacity="0.4"
          />
          <path
            d="M18 12L24 15V21L18 24L12 21V15L18 12Z"
            fill="url(#logoGradient)"
          />
          <circle cx="18" cy="18" r="3" fill="white" opacity="0.9" />
        </svg>
      </div>
    </motion.div>
  );
}
