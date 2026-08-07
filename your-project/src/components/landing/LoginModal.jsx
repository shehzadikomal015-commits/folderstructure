"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/components/auth/AuthProvider";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";

export function LoginModal({ open, onClose, onSwitchToSignup }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
             className="relative w-full max-w-md bg-gradient-to-b from-white to-gray-50 rounded-3xl shadow-2xl shadow-primary/10 overflow-hidden border border-gray-200"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-muted hover:text-foreground transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-8">
              <div className="flex flex-col items-center mb-8">
                <Logo className="h-12 w-12 mb-4" />
                <h2 className="text-2xl font-bold text-foreground">
                  Welcome back
                </h2>
                <p className="text-sm text-muted mt-2">
                  Sign in to your RevenueAI account
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-danger/10 border border-danger/20"
                  >
                    <p className="text-sm text-danger">{error}</p>
                  </motion.div>
                )}
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-muted">Remember me</span>
                  </label>
                  <a
                    href="#"
                    className="text-primary hover:text-primary-light font-medium transition-colors"
                  >
                    Forgot Password?
                  </a>
                </div>
                <Button type="submit" className="w-full" size="lg" loading={loading}>
                  Sign In
                </Button>
              </form>

              <p className="text-center text-xs text-muted mt-6">
                Don&apos;t have an account?{" "}
                <button
                  onClick={onSwitchToSignup}
                  className="text-primary hover:text-primary-light font-medium transition-colors"
                >
                  Sign up
                </button>
              </p>
              <p className="text-center text-[10px] text-muted/60 mt-4">
                Demo: demo@airevenue.com / 12345678
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
