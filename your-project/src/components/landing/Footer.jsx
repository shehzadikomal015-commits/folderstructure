"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Globe, ExternalLink, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { container, item, fadeInUp, hoverLift, smoothTransition } from "@/lib/motionVariants";

const footerLinks = {
  Product: [{ name: "Features", href: "/#features" }, { name: "Pricing", href: "/#features" }, { name: "Integrations", href: "/#features" }, { name: "Changelog", href: "/#features" }],
  Company: [{ name: "About", href: "/#features" }, { name: "Blog", href: "/#features" }, { name: "Careers", href: "/#features" }, { name: "Contact", href: "/#features" }],
  Resources: [{ name: "Documentation", href: "/#features" }, { name: "Help Center", href: "/#features" }, { name: "API", href: "/#features" }, { name: "Status", href: "/#features" }],
};

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-secondary/20 rounded-full blur-[100px]" />
      </div>
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12"
        >
          <motion.div variants={item} className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group relative">
              <Logo className="h-9 w-9" />
              <span className="text-xl font-bold bg-gradient-to-r from-white via-primary-light to-secondary bg-clip-text text-transparent tracking-tight">
                RevenueAI
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              AI-powered revenue recovery for ecommerce stores.
            </p>
          </motion.div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <motion.div key={title} variants={item}>
              <h4 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-300 relative group"
                    >
                      {item.name}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300 rounded-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

         <motion.div
           variants={container}
           initial="hidden"
           whileInView="show"
           viewport={{ once: true, margin: "-50px" }}
           className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6"
         >
           <motion.p variants={item} className="text-sm text-slate-500">
             Â© 2025 RevenueAI. All rights reserved.
          </motion.p>
           <motion.div variants={item} className="flex items-center gap-6">
             {[
               { icon: Globe, label: "Website", href: "/" },
               { icon: ExternalLink, label: "LinkedIn", href: "https://linkedin.com" },
               { icon: Mail, label: "Email", href: "mailto:hello@revenueai.com" },
             ].map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.2, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                   className="text-slate-500 hover:text-white transition-colors duration-300"
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
             ))}
           </motion.div>
         </motion.div>
      </div>
    </footer>
  );
}
