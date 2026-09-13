"use client";

import { motion } from "framer-motion";
import { CheckCircle, Truck, Package, MapPin, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import Image from "next/image";
import { StoreNavbar } from "@/components/store/StoreNavbar";
import { fadeInUp, fadeInScale, springTransition, smoothTransition } from "@/lib/motionVariants";

export function OrderSuccessClient({ order }) {
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <StoreNavbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={springTransition}
          className="text-center max-w-md mx-auto mb-8 sm:mb-12"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-success" />
          </motion.div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-2">
            Order Confirmed
          </h1>
          <p className="text-sm sm:text-base text-muted">
            Thank you for your purchase! Your order has been placed successfully.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-3xl border border-border overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    Order #{order.id.slice(0, 8).toUpperCase()}
                  </h2>
                  <p className="text-sm text-muted">{formatDate(order.created_at)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {getStatusBadge(order.status)}
                <span className="text-2xl font-bold text-foreground">
                  £{Number(order.total_amount).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-8">
              <div className="space-y-4">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <Mail className="h-5 w-5" />
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

            <div className="space-y-4 mb-8">
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
                            <Image
                              src={item.products.image_url}
                              alt={item.products.name}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
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

            <div className="pt-6 border-t border-border">
              <div className="flex items-center justify-between text-lg">
                <span className="font-bold text-foreground">Total Amount</span>
                <span className="text-2xl font-bold text-foreground">
                  £{Number(order.total_amount).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/orders">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              View Order Details
            </Button>
          </Link>
          <Link href="/store">
            <Button size="lg" className="w-full sm:w-auto gap-2">
              <Truck className="h-5 w-5" />
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}