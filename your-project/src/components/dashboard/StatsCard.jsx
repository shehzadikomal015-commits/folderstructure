"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeInUp, hoverLift, smoothTransition } from "@/lib/motionVariants";

export function StatsCard({ title, value, growth, trend, icon: Icon, className }) {
  const isPositive = growth >= 0;

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={smoothTransition}
      className={cn(
        "p-6 rounded-3xl bg-white border border-border hover:shadow-xl hover:shadow-primary/5 transition-all duration-300",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <motion.span
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 }}
          className={cn(
            "text-xs font-bold px-2.5 py-1 rounded-full",
            isPositive
              ? "bg-success/10 text-success"
              : "bg-danger/10 text-danger"
          )}
        >
          {isPositive ? "+" : ""}
          {growth}%
        </motion.span>
      </div>
      <div>
        <p className="text-sm text-muted mb-1 font-medium">{title}</p>
        <p className="text-3xl font-extrabold text-foreground tracking-tight">{value}</p>
      </div>
      {trend && (
        <div className="mt-5 h-14 flex items-end gap-1.5">
          {trend.map((val, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${val}%` }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 + 0.3 }}
              className="flex-1 bg-gradient-to-t from-primary/30 to-primary/10 rounded-t-lg transition-all duration-300 hover:from-primary/40 hover:to-primary/20"
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
