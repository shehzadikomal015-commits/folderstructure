"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/components/store/CartProvider";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  ChevronLeft,
  CreditCard,
  Truck,
  ShieldCheck,
  CheckCircle,
  ShoppingCart,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { StoreNavbar } from "@/components/store/StoreNavbar";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    shippingName: "",
    shippingEmail: "",
    shippingPhone: "",
    shippingAddress: "",
    shippingCity: "",
  });

  const shipping = cartTotal > 100 ? 0 : 9.99;
  const tax = cartTotal * 0.1;
  const total = cartTotal + shipping + tax;

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!user) {
      setError("Please log in to place your order.");
      setLoading(false);
      return;
    }

    const items = cart.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
    }));

    const formDataObj = new FormData();
    formDataObj.append("shippingName", formData.shippingName);
    formDataObj.append("shippingEmail", formData.shippingEmail);
    formDataObj.append("shippingPhone", formData.shippingPhone);
    formDataObj.append("shippingAddress", formData.shippingAddress);
    formDataObj.append("shippingCity", formData.shippingCity);
    formDataObj.append("items", JSON.stringify(items));

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        body: formDataObj,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to place order");
      }

      clearCart();
      setOrderNumber(`#ORD-${Math.floor(100000 + Math.random() * 900000)}`);
      setOrderPlaced(true);
      router.push(`/order-success/${result.orderId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user && !authLoading) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
            <Truck className="h-10 w-10 text-muted" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Please log in</h1>
          <p className="text-muted mb-8">You need to be logged in to checkout.</p>
          <Button size="lg" className="w-full" onClick={() => router.push("/login")}>
            Log In
          </Button>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
            <Truck className="h-10 w-10 text-muted" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
          <p className="text-muted mb-8">Add some products to your cart before checking out.</p>
          <Link href="/store">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md bg-white rounded-2xl border border-border p-8 shadow-sm"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="h-16 w-16 rounded-full bg-success-light flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="h-8 w-8 text-success" />
          </motion.div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Order Confirmed</h1>
          <p className="text-muted mb-8">
            Thank you for your purchase! Your order has been placed successfully.
            You will receive a confirmation email shortly.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-8">
            <p className="text-sm text-muted mb-1">Order Number</p>
            <p className="text-lg font-bold text-foreground">
              {orderNumber}
            </p>
          </div>
          <Link href="/store">
            <Button size="lg" className="w-full">Continue Shopping</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50/50"
    >
      <StoreNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/store"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-6"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Store
          </Link>

          <h1 className="text-3xl font-bold text-foreground tracking-tight mb-8">Checkout</h1>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-danger/10 border border-danger/20"
          >
            <p className="text-sm text-danger">{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl border border-border p-6 space-y-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Truck className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-bold text-foreground">Shipping Information</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      name="shippingName"
                      value={formData.shippingName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
                    <input
                      type="email"
                      name="shippingEmail"
                      value={formData.shippingEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
                    <input
                      type="tel"
                      name="shippingPhone"
                      value={formData.shippingPhone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="+44 7700 900000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">City *</label>
                    <input
                      type="text"
                      name="shippingCity"
                      value={formData.shippingCity}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="London"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Shipping Address *</label>
                  <textarea
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleInputChange}
                    required
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    placeholder="123 Main Street, London, SW1A 1AA, UK"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-5 w-5" />
                      Place Order
                    </>
                  )}
                </Button>
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-2xl border border-border p-6"
              >
                <h3 className="font-bold text-foreground mb-4">Order Summary</h3>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {item.image_url || item.image ? (
                          <Image src={item.image_url || item.image} alt={item.name} width={48} height={48} className="w-full h-full object-cover" />
                        ) : (
                          <ShoppingCart className="h-5 w-5 text-primary/40" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                        <p className="text-xs text-muted">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium text-foreground">£{(Number(item.price) * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border mt-6 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Subtotal</span>
                    <span className="text-foreground font-medium">£{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Shipping</span>
                    <span className="text-foreground font-medium">
                      {shipping === 0 ? <Badge variant="success">Free</Badge> : `£${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Tax (10%)</span>
                    <span className="text-foreground font-medium">£{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">£{total.toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-3 text-sm text-muted bg-gray-50 rounded-xl p-4"
              >
                <ShieldCheck className="h-5 w-5 text-success flex-shrink-0" />
                <p>Your payment information is encrypted and secure. We do not store your card details.</p>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
