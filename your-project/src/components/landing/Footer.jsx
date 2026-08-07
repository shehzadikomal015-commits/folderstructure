"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Globe, ExternalLink, Mail } from "lucide-react";
import { Logo } from "./Logo";

const footerLinks = {
  Product: ["Features", "Pricing", "Integrations", "Changelog"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Resources: ["Documentation", "Help Center", "API", "Status"],
};

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.03] to-transparent" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group relative">
              <Logo className="h-9 w-9" />
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 via-primary-light to-secondary bg-clip-text text-transparent tracking-tight">
                RevenueAI
              </span>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              AI-powered revenue recovery for ecommerce stores.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-foreground mb-5 text-sm uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-primary-light transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

         <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-gray-500">
            Â© 2025 RevenueAI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {[
              { icon: Globe, label: "Website" },
              { icon: ExternalLink, label: "LinkedIn" },
              { icon: Mail, label: "Email" },
            ].map(({ icon: Icon, label }) => (
              <motion.a
                key={label}
                href="#"
                whileHover={{ scale: 1.15, color: "#7C3AED" }}
                 className="text-gray-500 hover:text-primary-light transition-all duration-300"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
