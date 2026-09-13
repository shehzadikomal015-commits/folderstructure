"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { container, item, fadeInUp, smoothTransition } from "@/lib/motionVariants";

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

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  function toggle(index) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <section id="faq" className="py-20 sm:py-24 bg-gradient-to-b from-background via-gray-50 to-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary-light mb-6">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 tracking-tight">
            Frequently Asked <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            Everything you need to know about RevenueAI.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-4"
        >
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="bg-white/60 rounded-2xl border border-gray-200 overflow-hidden hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between p-5 sm:p-6 cursor-pointer text-left"
              >
                <span className="font-semibold text-foreground text-base pr-4">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative flex-shrink-0 ml-2"
                >
                  <ChevronDown className="h-5 w-5 text-muted" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                      <p className="text-sm text-muted leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
