"use client";

import { motion } from "framer-motion";
import { Store, Search, Lightbulb, Rocket } from "lucide-react";
import { container, item, fadeInUp, hoverLift, smoothTransition } from "@/lib/motionVariants";

const steps = [
  {
    number: "01",
    icon: Store,
    title: "Connect Your Store",
    description:
      "Integrate your Shopify store in one click. No technical setup required.",
  },
  {
    number: "02",
    icon: Search,
    title: "AI Analyzes Your Business",
    description:
      "Our AI continuously monitors orders, customers, products, and revenue patterns.",
  },
  {
    number: "03",
    icon: Lightbulb,
    title: "Revenue Problems Detected",
    description:
      "Get instant alerts when revenue leaks are detected, with root cause analysis.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Take Action & Recover",
    description:
      "Follow AI-powered recommendations to fix issues and recover lost revenue.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-24 bg-gradient-to-b from-background via-gray-50 to-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-sm font-semibold text-secondary mb-6">
            Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 tracking-tight">
            How It <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            Four simple steps to recover lost revenue and grow your ecommerce business.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {steps.map((step, idx) => (
            <motion.div key={step.number} variants={item} className="relative">
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-4 w-8">
                  <svg
                    className="w-full h-4"
                    viewBox="0 0 100 20"
                    fill="none"
                  >
                    <defs>
                      <linearGradient id="connectorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4338CA" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#1E293B" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d="M0 10 H80 M70 4 L80 10 L70 16"
                      stroke="url(#connectorGrad)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ strokeDashoffset: 100, strokeDasharray: 100 }}
                      whileInView={{ strokeDashoffset: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.8, delay: idx * 0.2 + 0.5 }}
                    />
                  </svg>
                </div>
              )}
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary mb-6 sm:mb-8 shadow-lg shadow-primary/10 border border-primary/20"
                >
                  <step.icon className="h-8 w-8 sm:h-10 sm:w-10" />
                </motion.div>
                <div className="text-xs font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2 sm:mb-3 tracking-widest">
                  STEP {step.number}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-4">
                  {step.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
