"use client";

import { AlertTriangle, Lightbulb, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { fadeInUp, hoverLift, smoothTransition } from "@/lib/motionVariants";

const severityConfig = {
  high: { label: "High", variant: "danger" },
  medium: { label: "Medium", variant: "warning" },
  low: { label: "Low", variant: "muted" },
};

export function ProblemCard({ problem }) {
  const config = severityConfig[problem.severity] || severityConfig.medium;

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8, scale: 1.02, rotateX: 2 }}
      transition={smoothTransition}
      className={cn(
        "p-6 rounded-3xl bg-white border border-border transition-all duration-300 group",
        problem.severity === "high" && "border-danger/20"
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div
            animate={problem.severity === "high" ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-2.5 rounded-xl bg-gradient-to-br from-danger/10 to-danger/5"
          >
            <AlertTriangle className="h-5 w-5 text-danger" />
          </motion.div>
          <div>
            <h4 className="font-bold text-foreground text-sm">
              {problem.title}
            </h4>
            <p className="text-xs text-muted mt-0.5 leading-relaxed">{problem.description}</p>
          </div>
        </div>
        <Badge variant={config.variant}>{config.label}</Badge>
      </div>
      <div className="flex items-center justify-between mt-5 pt-5 border-t border-border">
        <div>
          <p className="text-xs text-muted font-medium">Estimated Loss</p>
          <p className="text-xl font-extrabold text-danger">
            {problem.loss}
            <span className="text-sm font-normal text-muted ml-1">
              {problem.lossPeriod}
            </span>
          </p>
        </div>
        <motion.div whileHover={{ x: 4 }} transition={smoothTransition}>
          <Button variant="ghost" size="sm" className="group-hover:text-primary">
            {problem.action} <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
