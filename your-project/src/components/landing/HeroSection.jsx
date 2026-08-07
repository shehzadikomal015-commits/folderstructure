"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export function HeroSection({ onOpenLogin, onOpenSignup }) {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-primary/15 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary/15 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-r from-primary/8 to-secondary/8 rounded-full blur-[150px] animate-pulse-glow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "3s" }} />
      </div>

      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center"
        >
          <div className="max-w-2xl">
            <motion.div variants={item} className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-10 animate-scale-in">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
              </span>
              <span className="text-sm font-semibold text-primary-light tracking-widest uppercase">
                AI-Powered Revenue Recovery
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-foreground leading-[1.05] tracking-tight mb-8"
            >
              Recover Lost{" "}
              <span className="bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent animate-gradient">
                Revenue
              </span>{" "}
              Before It&apos;s Gone
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg sm:text-xl text-muted leading-relaxed mb-10 max-w-xl"
            >
              RevenueAI continuously monitors your ecommerce store, detects revenue leaks in real-time, and provides actionable recommendations to grow your sales.
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 mb-12">
              {user ? (
                <Button size="lg" onClick={() => router.push("/dashboard")} className="w-full sm:w-auto shadow-xl shadow-primary/25">
                  Go to Dashboard
                </Button>
              ) : (
                <>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                    <Button size="lg" onClick={onOpenSignup} className="w-full sm:w-auto shadow-xl shadow-primary/25">
                      Start Free Trial
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                    <Button variant="secondary" size="lg" onClick={onOpenLogin} className="w-full sm:w-auto">
                      View Demo
                    </Button>
                  </motion.div>
                </>
              )}
            </motion.div>

            <motion.div variants={item} className="flex items-center gap-8 mt-14">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                     className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-background flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-primary/20"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">
                  2,500+ store owners
                </p>
                <p className="text-xs text-muted font-medium">
                  Trust RevenueAI
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={item}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                 className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl border border-border p-8 transform rotate-1 hover:rotate-0 transition-transform duration-500 shadow-primary/5"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-t-3xl" />
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-sm font-medium text-muted mb-1">Total Revenue</p>
                    <p className="text-4xl font-extrabold bg-gradient-to-r from-gray-900 to-primary-light bg-clip-text text-transparent">Â£24,500</p>
                  </div>
                  <span className="px-3 py-1.5 rounded-full bg-success/10 text-success text-sm font-bold border border-success/20">
                    +12.5%
                  </span>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Orders", value: "500", change: "+8.2%" },
                    { label: "Customers", value: "380", change: "+15.3%" },
                    { label: "Conversion", value: "2.8%", change: "-0.4%" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between p-4 rounded-2xl bg-gray-100 border border-gray-200 hover:border-primary/20 transition-all duration-300"
                    >
                      <span className="text-sm font-semibold text-muted">{item.label}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-foreground text-lg">
                          {item.value}
                        </span>
                        <span
                          className={`text-xs font-bold px-2 py-1 rounded-lg ${
                            item.change.startsWith("+")
                              ? "text-success bg-success/10"
                              : "text-danger bg-danger/10"
                          }`}
                        >
                          {item.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                 className="absolute -bottom-6 -right-6 w-72 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-border p-5 transform -rotate-3 hover:rotate-0 transition-transform duration-500 shadow-primary/10"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-danger/10 flex items-center justify-center flex-shrink-0 border border-danger/20">
                    <span className="text-2xl">â¨</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground leading-tight">
                      Checkout abandonment increased
                    </p>
                    <p className="text-xs text-muted font-medium mt-1">Â£1,840/month at risk</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                 className="absolute -top-4 -left-8 w-64 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-border p-5 hidden xl:block shadow-success/10"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0 border border-success/20">
                    <span className="text-xl">â</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground leading-tight">
                      Revenue recovered
                    </p>
                    <p className="text-xs text-muted font-medium mt-1">+Â£3,240 this month</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

