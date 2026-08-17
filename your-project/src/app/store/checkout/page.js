"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/components/store/CartProvider";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  ChevronLeft,
  CreditCard,
  Truck,
  ShieldCheck,
  CheckCircle,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const shipping = cartTotal > 100 ? 0 : 9.99;
  const tax = cartTotal * 0.1;
  const total = cartTotal + shipping + tax;

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
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
              #ORD-{Math.floor(100000 + Math.random() * 900000)}
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

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {step === 1 && (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={(e) => { e.preventDefault(); setStep(2); }}
                className="bg-white rounded-2xl border border-border p-6 space-y-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Truck className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-bold text-foreground">Shipping Information</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="123 Main Street" />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="London" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">ZIP Code</label>
                    <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="SW1A 1AA" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Country</label>
                    <input type="text" name="country" value={formData.country} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="UK" />
                  </div>
                </div>
                <Button type="submit" size="lg" className="w-full">Continue to Payment</Button>
              </motion.form>
            )}

            {step === 2 && (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl border border-border p-6 space-y-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-bold text-foreground">Payment Details</h2>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Card Number</label>
                  <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="4242 4242 4242 4242" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Expiry Date</label>
                    <input type="text" name="expiry" value={formData.expiry} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">CVV</label>
                    <input type="text" name="cvv" value={formData.cvv} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="123" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button type="button" variant="secondary" onClick={() => setStep(1)} className="flex-1">Back</Button>
                  <Button type="submit" size="lg" className="flex-1">Place Order</Button>
                </div>
              </motion.form>
            )}
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
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <ShoppingCart className="h-5 w-5 text-primary/40" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                      <p className="text-xs text-muted">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium text-foreground">£{(item.price * item.quantity).toFixed(2)}</span>
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
              className="bg-white rounded-2xl border border-border p-6"
            >
              <h3 className="font-bold text-foreground mb-4">Shipping Address</h3>
              <div className="space-y-2 text-sm">
                <p className="text-foreground font-medium">{formData.firstName || "First"} {formData.lastName || "Last"}</p>
                <p className="text-muted">{formData.address || "Address"}</p>
                <p className="text-muted">{formData.city || "City"}, {formData.zipCode || "ZIP"}</p>
                <p className="text-muted">{formData.country || "Country"}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-3 text-sm text-muted bg-gray-50 rounded-xl p-4"
            >
              <ShieldCheck className="h-5 w-5 text-success flex-shrink-0" />
              <p>Your payment information is encrypted and secure. We do not store your card details.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
