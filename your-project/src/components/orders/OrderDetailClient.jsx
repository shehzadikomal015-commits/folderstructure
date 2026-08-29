"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Package,
  ArrowLeft,
  Copy,
  CheckCircle,
  Truck,
  MapPin,
  User,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { StoreNavbar } from "@/components/store/StoreNavbar";

export function OrderDetailClient({ orderId, order: initialOrder, error: initialError }) {
  const [order, setOrder] = useState(initialOrder);
  const [error, setError] = useState(initialError);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function loadOrder() {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        const result = await res.json();
        if (!res.ok || result.error) {
          setError(result.error || "Order not found");
        } else if (result.order) {
          setOrder(result.order);
        }
      } catch {
        setError("Failed to load order");
      }
    }
    loadOrder();
  }, [orderId]);

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Order Not Found</h1>
          <p className="text-muted mb-8">{error || "The order you are looking for does not exist."}</p>
          <Link href="/orders">
            <Button>Back to Orders</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge variant="warning">Pending</Badge>;
      case "confirmed":
        return <Badge variant="info">Confirmed</Badge>;
      case "shipped":
        return <Badge variant="primary">Shipped</Badge>;
      case "delivered":
        return <Badge variant="success">Delivered</Badge>;
      case "cancelled":
        return <Badge variant="danger">Cancelled</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <StoreNavbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-3xl border border-border overflow-hidden"
        >
          <div className="p-6 sm:p-8 border-b border-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Order #{order.id.slice(0, 8).toUpperCase()}
                  </h1>
                  <p className="text-sm text-muted">
                    {new Date(order.created_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {getStatusBadge(order.status)}
                <span className="text-2xl font-bold text-foreground">
                  £{Number(order.total_amount).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Customer Information
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                  <p className="font-medium text-foreground">{order.shipping_name}</p>
                  <p className="text-muted">{order.shipping_email}</p>
                  {order.shipping_phone && (
                    <p className="text-muted">{order.shipping_phone}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Address
                </h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-foreground whitespace-pre-line">
                    {order.shipping_address}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Items
              </h3>
              <div className="border border-border rounded-2xl overflow-hidden">
                <div className="divide-y divide-border">
                  {order.order_items?.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {item.products?.image_url ? (
                            <Image src={item.products.image_url} alt={item.products.name} width={64} height={64} className="w-full h-full object-cover" />
                          ) : (
                            <Package className="h-6 w-6 text-primary/40" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {item.products?.name || "Unknown Product"}
                          </p>
                          <p className="text-sm text-muted">Qty: {item.quantity}</p>
                          <p className="text-sm text-muted">
                            £{Number(item.price).toFixed(2)} each
                          </p>
                        </div>
                      </div>
                      <p className="font-bold text-foreground">
                        £{(Number(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <div className="flex items-center justify-between text-lg">
                <span className="font-bold text-foreground">Total Amount</span>
                <span className="text-2xl font-bold text-foreground">
                  £{Number(order.total_amount).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
