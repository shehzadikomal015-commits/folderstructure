"use client";

import { Lightbulb, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { fadeInUp, hoverLift, smoothTransition, springTransition } from "@/lib/motionVariants";

export function AIRecommendationCard({ recommendation }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={smoothTransition}
      className="p-6 rounded-3xl bg-gradient-to-br from-primary/5 via-primary/3 to-secondary/5 border border-primary/10 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 relative overflow-hidden"
    >
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 pointer-events-none"
      />
      <div className="flex items-start gap-4 relative">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex-shrink-0">
          <Lightbulb className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-foreground">
              {recommendation.title}
            </h3>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 text-primary">
              AI Recommended
            </span>
          </div>
          <p className="text-sm text-muted leading-relaxed mb-4">
            {recommendation.description}
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-xs text-muted font-medium">Expected Impact</p>
                <p className="text-xl font-extrabold text-success">
                  {recommendation.impact}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted font-medium">Confidence</p>
                <p className="text-xl font-extrabold text-foreground">
                  {recommendation.confidence}%
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                View Details
              </Button>
              <Button size="sm">
                Generate Action Plan
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
