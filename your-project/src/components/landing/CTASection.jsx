"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { fadeInScale, smoothTransition } from "@/lib/motionVariants";

export function CTASection({ onOpenLogin, onOpenSignup }) {
  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-background via-gray-50 to-background relative overflow-hidden">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10 rounded-full blur-[150px]" />
      </motion.div>
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] via-transparent to-secondary/[0.03]" />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <motion.div
          variants={fadeInScale}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="p-8 sm:p-12 lg:p-16 rounded-[2rem] bg-gradient-to-br from-white to-gray-50 border border-primary/20 shadow-2xl shadow-primary/5 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 animate-gradient" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 tracking-tight">
              Ready to recover{" "}
              <span className="bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent">lost revenue</span>?
            </h2>
            <p className="text-base sm:text-lg text-muted mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of ecommerce store owners who are using AI to find and fix revenue leaks. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={onOpenSignup} className="shadow-xl shadow-primary/25">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" onClick={onOpenLogin}>
                Book Demo
              </Button>
            </div>
            <p className="text-xs text-muted mt-8 font-medium">
              No credit card required Â· Free 14-day trial · Cancel anytime
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
