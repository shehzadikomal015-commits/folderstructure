"use client";

import { motion } from "framer-motion";
import { fadeInScale, hoverLift, smoothTransition } from "@/lib/motionVariants";

export function DashboardPreview() {
  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-gray-50 via-background to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-to-r from-primary/8 to-secondary/8 rounded-full blur-[150px]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInScale}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-sm font-semibold text-secondary mb-6">
            Dashboard
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 tracking-tight">
            See your revenue like{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">never before</span>
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            A beautiful, intelligent dashboard that puts revenue recovery at the center of your decision-making.
          </p>
        </motion.div>

        <motion.div
          variants={fadeInScale}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="relative max-w-5xl mx-auto"
          style={{ perspective: 1200 }}
        >
          <motion.div
            whileHover={{ rotateX: 1, rotateY: -1, scale: 1.01 }}
            transition={smoothTransition}
            className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl border border-border overflow-hidden shadow-primary/5"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
            <div className="bg-background/80 border-b border-border px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-danger/60" />
                <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-warning/60" />
                <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-success/60" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-muted font-semibold tracking-wide">
                  AI Revenue Recovery Dashboard
                </span>
              </div>
            </div>
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {[
                  { label: "Revenue", value: "Â£24,500", change: "+12.5%" },
                  { label: "Orders", value: "500", change: "+8.2%" },
                  { label: "Customers", value: "380", change: "+15.3%" },
                  { label: "Conversion", value: "2.8%", change: "-0.4%" },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="p-3 sm:p-5 rounded-2xl bg-gray-100 border border-gray-200 hover:border-primary/20 transition-all duration-300"
                  >
                    <p className="text-[10px] sm:text-xs font-semibold text-muted mb-1 sm:mb-2 uppercase tracking-wider">{stat.label}</p>
                     <p className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-gray-900 to-primary-light bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <p
                      className={`text-[10px] sm:text-xs font-bold mt-1 sm:mt-2 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg inline-block ${
                        stat.change.startsWith("+")
                          ? "text-success bg-success/10"
                          : "text-danger bg-danger/10"
                      }`}
                    >
                      {stat.change}
                    </p>
                  </motion.div>
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="lg:col-span-2 p-4 sm:p-6 rounded-2xl bg-danger/5 border border-danger/10">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="text-2xl sm:text-3xl flex-shrink-0">â¨</div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1 sm:mb-2">
                        Problems Detected
                      </h4>
                      <p className="text-xs sm:text-sm text-muted">
                        Checkout abandonment increased by 28%
                      </p>
                      <div className="mt-3 sm:mt-4 h-16 sm:h-20 bg-gradient-to-r from-danger/20 to-transparent rounded-xl" />
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-6 rounded-2xl bg-primary/5 border border-primary/10">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="text-2xl sm:text-3xl flex-shrink-0">â</div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1 sm:mb-2">
                        AI Insight
                      </h4>
                      <p className="text-xs sm:text-sm text-muted">
                        Add free-shipping threshold
                      </p>
                      <div className="mt-3 sm:mt-4 h-16 sm:h-20 bg-gradient-to-r from-primary/20 to-transparent rounded-xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -12, 0] }}
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="absolute -top-4 -right-4 w-72 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-border p-5 hidden lg:block shadow-success/10"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0 border border-success/20">
                <span className="text-xl">â</span>
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">
                  Revenue recovered
                </p>
                <p className="text-xs text-muted font-medium">+Â£3,240 this month</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 12, 0] }}
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
             className="absolute -bottom-4 -left-4 w-72 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-border p-5 hidden lg:block shadow-primary/10"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                <span className="text-lg font-bold text-primary">AI</span>
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">
                  AI Recommendation
                </p>
                <p className="text-xs text-muted font-medium">
                  Launch abandoned cart campaign
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
