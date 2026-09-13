"use client";

import { motion } from "framer-motion";
import { Truck, RotateCcw, TrendingDown, Users, ShoppingCart, BarChart3 } from "lucide-react";
import { container, item, fadeInUp, hoverLift, smoothTransition } from "@/lib/motionVariants";

const problems = [
  {
    icon: ShoppingCart,
    title: "Cart Abandonment",
    description: "Customers leave before completing checkout, costing you thousands.",
  },
  {
    icon: TrendingDown,
    title: "Revenue Drops",
    description: "Unexpected revenue declines hit your business without warning.",
  },
  {
    icon: RotateCcw,
    title: "Refund Spikes",
    description: "Increasing returns and refunds eating into your profits.",
  },
  {
    icon: Users,
    title: "Customer Retention",
    description: "One-time buyers instead of loyal, repeat customers.",
  },
  {
    icon: Truck,
    title: "Shipping Issues",
    description: "Hidden shipping costs surprise customers at checkout.",
  },
  {
    icon: BarChart3,
    title: "Analytics Blind Spots",
    description: "Traditional analytics miss hidden revenue opportunities.",
  },
];

export function ProblemSection() {
  return (
    <section id="problems" className="py-24 bg-gradient-to-b from-background via-gray-50 to-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary-light mb-6">
            Revenue Leaks
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-6 tracking-tight">
            Silent revenue leaks
            <span className="bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent"> hurting you</span>
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            Every ecommerce store faces hidden problems that drain revenue. Without AI, they remain invisible until it&apos;s too late.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {problems.map((problem) => (
            <motion.div
              key={problem.title}
              variants={item}
              whileHover={{ y: -8, scale: 1.02, rotateY: 2 }}
              transition={smoothTransition}
              className="group p-8 rounded-3xl bg-white/50 border border-gray-200 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:from-primary/30 group-hover:to-secondary/30 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-primary/5 border border-primary/10"
              >
                <problem.icon className="h-8 w-8 text-primary-light" />
              </motion.div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {problem.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
