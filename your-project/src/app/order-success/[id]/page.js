"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  CheckCircle,
  Package,
  ArrowRight,
  Copy,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { StoreNavbar } from "@/components/store/StoreNavbar";

export default function OrderSuccessPage({ params }) {
  const { id } = params;
  const [copied, setCopied] = useState(false);
  const [orderId] = useState(() => id || `#ORD-${Math.floor(100000 + Math.random() * 900000)}`);

  const handleCopy = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex items-center justify-center px-4 py-12">
      <StoreNavbar />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-lg w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="h-20 w-20 rounded-full bg-success-light flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle className="h-10 w-10 text-success" />
        </motion.div>

        <h1 className="text-3xl font-bold text-foreground mb-3">Order Confirmed!</h1>
        <p className="text-muted text-lg mb-8">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-border p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="text-left">
              <p className="text-sm text-muted mb-1">Order ID</p>
              <p className="text-xl font-bold text-foreground">{orderId}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? "Copied!" : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-sm">
            <span className="text-muted">Status</span>
            <Badge variant="warning">Pending</Badge>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <Link href="/orders" className="block">
            <Button size="lg" className="w-full gap-2">
              <Package className="h-5 w-5" />
              View My Orders
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/store">
            <Button variant="ghost" size="lg" className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-muted mt-8"
        >
          A confirmation email will be sent to you shortly.
        </motion.p>
      </motion.div>
    </div>
  );
}
