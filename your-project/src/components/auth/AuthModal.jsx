"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter, usePathname } from "next/navigation";
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

export function AuthModal({ 
  open, 
  onClose, 
  onSwitchMode,
  initialMode = "login",
  title,
  subtitle,
  submitLabel,
  switchLabel,
  switchActionLabel,
  showDemo = false,
  demoCredentials,
  onSubmit,
  fields = []
}) {
  const [mode, setMode] = useState(initialMode);
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
      await onSubmit(formData, mode);
      onClose();
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

  const switchMode = (newMode) => {
    setMode(newMode);
    setError("");
    setForgotError("");
    setForgotSuccess("");
    setFormData({});
  };

  if (!open) return null;

  return (
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
        variants={fadeInScale}
        initial="hidden"
        animate="show"
        exit="hidden"
        transition={springTransition}
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
          <motion.div variants={fadeInUp} initial="hidden" animate="show" className="flex flex-col items-center mb-8">
            <Logo className="h-12 w-12 mb-4" />
            <h2 className="text-2xl font-bold text-foreground">{title}</h2>
            <p className="text-sm text-muted mt-2">{subtitle}</p>
          </motion.div>

          {mode === "login" && forgotSuccess !== "reset_ready" && forgotSuccess !== "done" && (
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
              {fields.map((field, idx) => (
                <motion.div key={field.name} variants={item}>
                  <Input
                    label={field.label}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={handleInputChange}
                    required={field.required}
                  />
                </motion.div>
              ))}
              {fields.some(f => f.type === "password") && (
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
                    onClick={() => setMode("forgot")}
                    className="text-primary hover:text-primary-light font-medium transition-colors"
                  >
                    Forgot Password?
                  </button>
                </motion.div>
              )}
              <motion.div variants={item}>
                <Button type="submit" className="w-full" size="lg" loading={loading}>
                  {submitLabel}
                </Button>
              </motion.div>
            </motion.form>
          )}

          {mode === "forgot" && forgotSuccess !== "reset_ready" && forgotSuccess !== "done" && (
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
                  onClick={() => setMode("login")}
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
                  setMode("login");
                  setForgotSuccess("");
                  setForgotError("");
                  setForgotEmail("");
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
              {fields.map((field, idx) => (
                <motion.div key={field.name} variants={item}>
                  <Input
                    label={field.label}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={handleInputChange}
                    required={field.required}
                  />
                </motion.div>
              ))}
              <motion.div variants={item}>
                <Button type="submit" className="w-full" size="lg" loading={loading}>
                  {submitLabel}
                </Button>
              </motion.div>
            </motion.form>
          )}

          {(mode === "login" || mode === "signup") && (
            <motion.p variants={fadeInUp} initial="hidden" animate="show" className="text-center text-xs sm:text-sm text-muted mt-6 sm:mt-8">
              {switchLabel}{" "}
              <button
                onClick={() => switchMode(onSwitchMode)}
                className="text-primary hover:text-primary-light font-semibold transition-colors"
              >
                {switchActionLabel}
              </button>
            </motion.p>
          )}

          {showDemo && demoCredentials && mode === "login" && (
            <motion.p variants={fadeInUp} initial="hidden" animate="show" className="text-center text-[10px] text-muted/60 mt-4">
              Demo: {demoCredentials}
            </motion.p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}