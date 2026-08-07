"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Founder, StyleHub",
    content:
      "RevenueAI helped us identify checkout issues we never knew existed. Our revenue increased by 23% in the first month.",
    avatar: "SC",
  },
  {
    name: "Michael Ross",
    role: "Ecommerce Manager, TechGear",
    content:
      "The AI recommendations are incredibly accurate. It is like having a revenue expert watching our store 24/7.",
    avatar: "MR",
  },
  {
    name: "Priya Patel",
    role: "CEO, Boutique Online",
    content:
      "We recovered over Â£5,000 in lost revenue in just 3 weeks. The ROI is incredible.",
    avatar: "PP",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-gray-50 to-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-sm font-semibold text-accent mb-6">
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-6 tracking-tight">
            Trusted by store owners{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">worldwide</span>
          </h2>
          <p className="text-lg text-muted leading-relaxed">
            Join thousands of ecommerce businesses recovering lost revenue with AI.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={card}
              whileHover={{ y: -8, scale: 1.02 }}
              className="p-8 rounded-3xl bg-white/50 border border-gray-200 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/25 border-2 border-primary/30">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-bold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted font-medium">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-sm text-muted leading-relaxed italic">
                &ldquo;{testimonial.content}&rdquo;
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
