"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/landing/Logo";
import { fadeInUp, fadeInScale, springTransition, smoothTransition, container, item } from "@/lib/motionVariants";

const shakeKeyframes = {
  shake: {
    x: [0, -8, 8, -6, 6, -3, 3, 0],
    transition: { duration: 0.5 },
  },
};

export default function SignupPage() {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await signup(name, email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-primary/10 relative overflow-auto py-8">
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 25, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={fadeInScale}
        initial="hidden"
        animate="show"
        transition={springTransition}
        className="w-full max-w-md mx-4"
      >
        <motion.div variants={fadeInUp} initial="hidden" animate="show" className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 lg:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

          <motion.div variants={fadeInUp} initial="hidden" animate="show" className="flex flex-col items-center mb-8 sm:mb-10">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link href="/" className="mb-5 sm:mb-6">
                <Logo className="h-14 w-14 sm:h-16 sm:w-16" />
              </Link>
            </motion.div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Create your account</h1>
            <p className="text-xs sm:text-sm text-muted mt-1 sm:mt-2">Start recovering lost revenue today</p>
          </motion.div>

          <motion.form variants={container} initial="hidden" animate="show" onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div
                variants={shakeKeyframes}
                animate="shake"
                className="p-3 rounded-xl bg-danger/10 border border-danger/20"
              >
                <p className="text-sm text-danger">{error}</p>
              </motion.div>
            )}
            <motion.div variants={item}>
              <Input
                label="Full Name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </motion.div>
            <motion.div variants={item}>
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </motion.div>
            <motion.div variants={item}>
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </motion.div>
            <motion.div variants={item}>
              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </motion.div>
            <motion.div variants={item}>
              <Button type="submit" className="w-full" size="lg" loading={loading}>
                Create Account
              </Button>
            </motion.div>
          </motion.form>

          <motion.p variants={fadeInUp} initial="hidden" animate="show" className="text-center text-xs sm:text-sm text-muted mt-6 sm:mt-8">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:text-primary-light font-semibold transition-colors"
            >
              Sign in
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}
