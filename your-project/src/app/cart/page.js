"use client";

import { motion } from "framer-motion";
import { StoreNavbar } from "@/components/store/StoreNavbar";
import { useCart } from "@/components/store/CartProvider";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Trash2, ShoppingBag, ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5 sm:mb-6">
            <ShoppingBag className="h-8 w-8 sm:h-10 sm:w-10 text-muted" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
          <p className="text-sm text-muted mb-6 sm:mb-8">
            Looks like you have not added anything to your cart yet.
          </p>
          <Link href="/store">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <StoreNavbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Shopping Cart</h1>
            <p className="text-sm text-muted mt-1">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} items in your cart
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={clearCart} className="text-danger hover:text-danger">
            <Trash2 className="h-4 w-4" />
            Clear Cart
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white rounded-2xl border border-border p-4 sm:p-6"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="h-20 w-20 sm:h-28 sm:w-28 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {item.image_url || item.image ? (
                      <Image
                        src={item.image_url || item.image}
                        alt={item.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ShoppingCart className="h-6 w-6 sm:h-8 sm:w-8 text-primary/40" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-foreground text-base sm:text-lg">{item.name}</h3>
                        <p className="text-xs sm:text-sm text-muted mt-1">
                          {item.category && <Badge variant="primary" className="text-xs mr-2">{item.category}</Badge>}
                        </p>
                        <p className="text-base sm:text-lg font-semibold text-foreground mt-1 sm:mt-2">
                          £{Number(item.price).toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 rounded-lg text-muted hover:text-danger hover:bg-danger-light transition-colors"
                      >
                        <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3 sm:mt-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg border border-border flex items-center justify-center text-muted hover:text-foreground hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                        <span className="text-sm font-bold text-foreground w-6 sm:w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                          className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg border border-border flex items-center justify-center text-muted hover:text-foreground hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                          <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                      </div>
                      <p className="text-base sm:text-lg font-bold text-foreground">
                        £{(Number(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl border border-border p-4 sm:p-6 sticky top-24"
            >
              <h3 className="font-bold text-foreground text-base sm:text-lg mb-4 sm:mb-6">Order Summary</h3>
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <span className="text-muted truncate pr-4">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-medium text-foreground flex-shrink-0">
                      £{(Number(item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 sm:pt-4 space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span className="font-medium text-foreground">£{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted">Shipping</span>
                  <span className="font-medium text-foreground">
                    {cartTotal > 100 ? <Badge variant="success">Free</Badge> : "£9.99"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-base sm:text-lg font-bold pt-2 sm:pt-3 border-t border-border">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">
                    £{(cartTotal + (cartTotal > 100 ? 0 : 9.99)).toFixed(2)}
                  </span>
                </div>
              </div>
              <Link href="/store/checkout" className="block mt-4 sm:mt-6">
                <Button size="lg" className="w-full gap-2">
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                  Proceed to Checkout
                </Button>
              </Link>
              <Link href="/store">
                <Button variant="ghost" className="w-full mt-2 sm:mt-3">
                  <ArrowLeft className="h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
