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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function FeaturesGrid() {
  return (
    <section id="features" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary-light mb-6">
            Features
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-6 tracking-tight">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent">recover revenue</span>
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            Powerful features designed to help you identify, understand, and fix revenue problems automatically.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={card}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group p-8 rounded-3xl bg-white/50 border border-gray-200 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:from-primary/30 group-hover:to-secondary/30 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-primary/5 border border-primary/10">
                <feature.icon className="h-8 w-8 text-primary-light" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
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
