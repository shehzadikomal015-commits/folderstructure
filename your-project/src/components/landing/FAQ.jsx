"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How does RevenueAI work?",
    answer:
      "RevenueAI connects to your Shopify store and continuously monitors your orders, customers, and products. It uses advanced AI to detect revenue leaks such as checkout abandonment, refund spikes, and conversion drops, then provides actionable recommendations to fix them.",
  },
  {
    question: "Do I need technical skills to use this?",
    answer:
      "No. The platform is designed for ecommerce store owners with no technical background. Just connect your store and the AI does the rest.",
  },
  {
    question: "Which platforms do you support?",
    answer:
      "Currently, we support Shopify. We are working on adding WooCommerce, BigCommerce, and other platforms soon.",
  },
  {
    question: "Is my store data secure?",
    answer:
      "Yes. We use enterprise-grade encryption and never share your data with third parties. Your store data is stored securely and used only to generate insights for your business.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "Most customers see actionable insights within 24 hours of connecting their store. Revenue recovery typically begins within the first week.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. There are no long-term contracts. You can cancel your subscription at any time with one click.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary-light mb-6">
            FAQ
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-6 tracking-tight">
            Frequently Asked <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            Everything you need to know about RevenueAI.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-4"
        >
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="bg-white/50 rounded-2xl border border-gray-200 overflow-hidden hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <details className="group">
                <summary className="w-full flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-semibold text-foreground text-base pr-4">
                    {faq.question}
                  </span>
                  <span className="relative flex-shrink-0 ml-2">
                    <ChevronDown className="h-5 w-5 text-muted transition-transform duration-300 group-open:rotate-180" />
                  </span>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-sm text-muted leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </details>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
