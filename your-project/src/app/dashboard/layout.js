"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardNavbar } from "@/components/dashboard/Navbar";
import RealtimeRefresh from "@/components/dashboard/RealtimeRefresh";
import { LoginModal } from "@/components/landing/LoginModal";
import { SignupModal } from "@/components/landing/SignupModal";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const { user, hydrated } = useAuth();
  const pathname = usePathname();
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/10 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px]" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto text-center p-8"
          >
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Sign in required</h2>
            <p className="text-muted mb-6">Please sign in to access your dashboard.</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setLoginOpen(true)}
                className="px-6 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
              >
                Sign in
              </button>
              <button
                onClick={() => setSignupOpen(true)}
                className="px-6 py-2.5 rounded-xl border border-border text-foreground font-medium hover:bg-gray-50 transition-colors"
              >
                Create account
              </button>
            </div>
          </motion.div>
        </div>
        <LoginModal
          open={loginOpen}
          onClose={() => setLoginOpen(false)}
          onSwitchToSignup={() => { setLoginOpen(false); setSignupOpen(true); }}
        />
        <SignupModal
          open={signupOpen}
          onClose={() => setSignupOpen(false)}
          onSwitchToLogin={() => { setSignupOpen(false); setLoginOpen(true); }}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Sidebar />
      <div className="pl-64 transition-all duration-300">
        <DashboardNavbar />
        <main className="p-4 sm:p-6 lg:p-10">
          <RealtimeRefresh tables={["orders", "products", "customers"]} />
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
