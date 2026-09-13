"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { container, item, fadeInUp, smoothTransition } from "@/lib/motionVariants";

export function Timeline({ items }) {
  const typeColors = {
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
    info: "bg-info",
    muted: "bg-muted",
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="relative"
    >
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute left-3 top-2 bottom-2 w-px bg-border origin-top"
      />
      <div className="space-y-4">
        {items.map((item) => (
          <motion.div key={item.id} variants={item} className="flex gap-4">
            <div className="relative z-10 mt-1">
              <motion.div
                whileHover={{ scale: 1.5 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={cn(
                  "w-2.5 h-2.5 rounded-full",
                  typeColors[item.type] || typeColors.muted
                )}
              />
            </div>
            <div className="flex-1 pb-4">
              <p className="text-sm font-medium text-foreground">
                {item.title}
              </p>
              <p className="text-xs text-muted mt-0.5">{item.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
