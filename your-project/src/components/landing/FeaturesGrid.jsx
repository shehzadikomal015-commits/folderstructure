"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Lightbulb,
  FileText,
  BarChart3,
  Zap,
} from "lucide-react";
import { container, item, fadeInUp, hoverLift, smoothTransition } from "@/lib/motionVariants";

const features = [
  {
    icon: DollarSign,
    title: "Revenue Intelligence",
    description:
      "Track revenue trends, identify growth opportunities, and understand where money is coming from.",
  },
  {
    icon: ShoppingCart,
    title: "Order Intelligence",
    description:
      "Monitor order fulfillment, detect issues, and ensure every order reaches its potential.",
  },
  {
    icon: Users,
    title: "Customer Insights",
    description:
      "Understand customer behavior, identify VIP customers, and improve retention.",
  },
  {
    icon: Package,
    title: "Product Analytics",
    description:
      "See which products perform best, identify underperformers, and optimize your catalog.",
  },
  {
    icon: Lightbulb,
    title: "AI Recommendations",
    description:
      "Get actionable insights powered by AI that tell you exactly what to fix and how.",
  },
  {
    icon: FileText,
    title: "Smart Reports",
    description:
      "Automated reports that highlight problems, opportunities, and revenue forecasts.",
  },
  {
    icon: BarChart3,
    title: "Revenue Recovery",
    description:
      "Identify checkout abandonment, refund spikes, and other leaks automatically.",
  },
  {
    icon: Zap,
    title: "Real-Time Monitoring",
    description:
      "Get instant alerts when something goes wrong, so you can act before it hurts revenue.",
  },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="py-20 sm:py-24 bg-gradient-to-b from-background via-gray-50 to-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary-light mb-6">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 tracking-tight">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent">recover revenue</span>
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            Powerful features designed to help you identify, understand, and fix revenue problems automatically.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              whileHover={{ y: -8, scale: 1.02, rotateX: 2 }}
              transition={smoothTransition}
              className="group p-6 sm:p-8 rounded-3xl bg-white/60 border border-gray-200 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-5 sm:mb-6 group-hover:from-primary/30 group-hover:to-secondary/30 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-primary/5 border border-primary/10"
              >
                <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary-light" />
              </motion.div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
