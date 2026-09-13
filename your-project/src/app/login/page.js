"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/landing/Logo";
import { fadeInUp, fadeInScale, springTransition, smoothTransition, container, item } from "@/lib/motionVariants";
import { useState, useEffect } from "react";

const shakeKeyframes = {
  shake: {
    x: [0, -8, 8, -6, 6, -3, 3, 0],
    transition: { duration: 0.5 },
  },
};

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [resetPassword, setResetPassword] = useState("");
  const [resetConfirm, setResetConfirm] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "login") {
        await login(formData.email, formData.password);
      } else {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match");
        }
        if (formData.password.length < 6) {
          throw new Error("Password must be at least 6 characters");
        }
        await signup(formData.name, formData.email, formData.password);
      }
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setForgotError("");
    setForgotSuccess("");
    setForgotLoading(true);
    try {
      const { localStore, seedIfEmpty } = await import("@/lib/localStore");
      seedIfEmpty();
      const users = localStore.getUsers();
      const found = users.find((u) => u.email === forgotEmail);
      if (!found) {
        setForgotError("No account found with this email address.");
        setForgotLoading(false);
        return;
      }
      setForgotSuccess("reset_ready");
    } catch (err) {
      setForgotError("Something went wrong. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setForgotError("");
    if (!resetPassword || resetPassword.length < 6) {
      setForgotError("Password must be at least 6 characters.");
      return;
    }
    if (resetPassword !== resetConfirm) {
      setForgotError("Passwords do not match.");
      return;
    }
    setForgotLoading(true);
    try {
      const { localStore, seedIfEmpty } = await import("@/lib/localStore");
      seedIfEmpty();
      const users = localStore.getUsers();
      const idx = users.findIndex((u) => u.email === forgotEmail);
      if (idx === -1) {
        setForgotError("User not found.");
        setForgotLoading(false);
        return;
      }
      users[idx].password = resetPassword;
      localStore.setUsers(users);
      setForgotSuccess("done");
      setResetPassword("");
      setResetConfirm("");
    } catch (err) {
      setForgotError("Failed to reset password. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-primary/10 relative overflow-hidden px-4">
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 25, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl"
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
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              {forgotSuccess === "reset_ready" || forgotSuccess === "done" ? "Reset Password" : mode === "login" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-xs sm:text-sm text-muted mt-1 sm:mt-2">
              {forgotSuccess === "reset_ready" ? "Enter your new password" : forgotSuccess === "done" ? "Password reset successful" : mode === "login" ? "Sign in to your RevenueAI account" : "Start recovering lost revenue today"}
            </p>
          </motion.div>

          {mode === "login" && !forgotSuccess && (
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
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                  required
                />
              </motion.div>
              <motion.div variants={item}>
                <Input
                  label="Password"
                  type="password"
                  placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                  name="password"
                  value={formData.password || ""}
                  onChange={handleInputChange}
                  required
                />
              </motion.div>
              <motion.div variants={item} className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-muted">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setForgotError("");
                    setForgotSuccess("");
                    setMode("forgot");
                  }}
                  className="text-primary hover:text-primary-light font-medium transition-colors"
                >
                  Forgot Password?
                </button>
              </motion.div>
              <motion.div variants={item}>
                <Button type="submit" className="w-full" size="lg" loading={loading}>
                  Sign In
                </Button>
              </motion.div>
            </motion.form>
          )}

          {mode === "forgot" && !forgotSuccess && (
            <motion.form
              variants={fadeInUp}
              initial="hidden"
              animate="show"
              transition={smoothTransition}
              onSubmit={handleForgotSubmit}
              className="space-y-5"
            >
              {forgotError && (
                <motion.div
                  variants={shakeKeyframes}
                  animate="shake"
                  className="p-3 rounded-xl bg-danger/10 border border-danger/20"
                >
                  <p className="text-sm text-danger">{forgotError}</p>
                </motion.div>
              )}
              <motion.div variants={item}>
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                />
              </motion.div>
              <motion.div variants={item} className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setMode("login");
                    setForgotError("");
                    setForgotSuccess("");
                  }}
                >
                  Back
                </Button>
                <Button type="submit" className="flex-1" loading={forgotLoading}>
                  Continue
                </Button>
              </motion.div>
            </motion.form>
          )}

          {forgotSuccess === "reset_ready" && (
            <motion.form
              variants={fadeInUp}
              initial="hidden"
              animate="show"
              transition={smoothTransition}
              onSubmit={handleResetSubmit}
              className="space-y-5"
            >
              {forgotError && (
                <motion.div
                  variants={shakeKeyframes}
                  animate="shake"
                  className="p-3 rounded-xl bg-danger/10 border border-danger/20"
                >
                  <p className="text-sm text-danger">{forgotError}</p>
                </motion.div>
              )}
              <motion.div variants={item}>
                <Input
                  label="New Password"
                  type="password"
                  placeholder="At least 6 characters"
                  name="resetPassword"
                  value={resetPassword}
                  onChange={(e) => setResetPassword(e.target.value)}
                  required
                />
              </motion.div>
              <motion.div variants={item}>
                <Input
                  label="Confirm New Password"
                  type="password"
                  placeholder="Repeat new password"
                  name="resetConfirm"
                  value={resetConfirm}
                  onChange={(e) => setResetConfirm(e.target.value)}
                  required
                />
              </motion.div>
              <motion.div variants={item} className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setForgotSuccess("");
                    setForgotError("");
                    setResetPassword("");
                    setResetConfirm("");
                    setMode("login");
                  }}
                >
                  Back
                </Button>
                <Button type="submit" className="flex-1" loading={forgotLoading}>
                  Reset Password
                </Button>
              </motion.div>
            </motion.form>
          )}

          {forgotSuccess === "done" && (
            <motion.div
              variants={fadeInScale}
              initial="hidden"
              animate="show"
              transition={springTransition}
              className="text-center space-y-4"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                className="h-16 w-16 rounded-full bg-success-light flex items-center justify-center mx-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </motion.div>
              <h3 className="text-xl font-bold text-foreground">Password reset successful</h3>
              <p className="text-sm text-muted">You can now sign in with your new password.</p>
              <Button
                className="w-full"
                size="lg"
                onClick={() => {
                  setForgotMode(false);
                  setForgotSuccess("");
                  setForgotError("");
                  setForgotEmail("");
                  setMode("login");
                }}
              >
                Back to Sign In
              </Button>
            </motion.div>
          )}

          {mode === "signup" && (
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
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  required
                />
              </motion.div>
              <motion.div variants={item}>
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                  required
                />
              </motion.div>
              <motion.div variants={item}>
                <Input
                  label="Password"
                  type="password"
                  placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                  name="password"
                  value={formData.password || ""}
                  onChange={handleInputChange}
                  required
                />
              </motion.div>
              <motion.div variants={item}>
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                  name="confirmPassword"
                  value={formData.confirmPassword || ""}
                  onChange={handleInputChange}
                  required
                />
              </motion.div>
              <motion.div variants={item}>
                <Button type="submit" className="w-full" size="lg" loading={loading}>
                  Create Account
                </Button>
              </motion.div>
            </motion.form>
          )}

          {(mode === "login" || mode === "signup") && !forgotSuccess && (
            <motion.p variants={fadeInUp} initial="hidden" animate="show" className="text-center text-xs sm:text-sm text-muted mt-6 sm:mt-8">
              {mode === "login" ? "Don&apos;t have an account?" : "Already have an account?"}{" "}
              <Link
                href={mode === "login" ? "/signup" : "/login"}
                className="text-primary hover:text-primary-light font-semibold transition-colors"
              >
                {mode === "login" ? "Create one" : "Sign in"}
              </Link>
            </motion.p>
          )}
        </motion.div>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          className="text-center text-xs text-gray-500 mt-6"
        >
          Demo: demo@airevenue.com / 12345678
        </motion.p>
      </motion.div>
    </div>
  );
}