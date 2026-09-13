"use client";

import { useCart } from "@/components/store/CartProvider";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ShoppingCart, Minus, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { slideInRight, container, item, fadeInUp, springTransition, smoothTransition } from "@/lib/motionVariants";

export function CartDrawer() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, cartTotal, isOpen, setIsOpen, clearCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={springTransition}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="show"
            exit="hidden"
            transition={springTransition}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-bold text-foreground">Shopping Cart</h2>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 text-muted hover:text-foreground transition-colors">
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <motion.div variants={fadeInUp} initial="hidden" animate="show" className="flex flex-col items-center justify-center h-full text-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4"
                  >
                    <ShoppingCart className="h-8 w-8 text-muted" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Your cart is empty</h3>
                  <p className="text-sm text-muted mb-6">Looks like you have not added anything to your cart yet.</p>
                  <Button onClick={() => setIsOpen(false)}>Continue Shopping</Button>
                </motion.div>
              ) : (
                <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
                  {cart.map((item) => (
                    <motion.div key={item.id} variants={item} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-gray-50/50">
                      <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {item.image_url || item.image ? (
                          <Image src={item.image_url || item.image} alt={item.name} width={64} height={64} className="w-full h-full object-cover" />
                        ) : (
                          <ShoppingCart className="h-6 w-6 text-primary/40" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground truncate">{item.name}</h4>
                        <p className="text-sm text-muted">£{Number(item.price).toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <motion.button whileTap={{ scale: 0.9 }} onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8 rounded-lg border border-border flex items-center justify-center text-muted hover:text-foreground hover:bg-white transition-colors">
                            <Minus className="h-4 w-4" />
                          </motion.button>
                          <span className="text-sm font-medium text-foreground w-8 text-center">{item.quantity}</span>
                          <motion.button whileTap={{ scale: 0.9 }} onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8 rounded-lg border border-border flex items-center justify-center text-muted hover:text-foreground hover:bg-white transition-colors">
                            <Plus className="h-4 w-4" />
                          </motion.button>
                          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => removeFromCart(item.id)} className="ml-auto p-2 rounded-lg text-muted hover:text-danger hover:bg-danger-light transition-colors">
                            <X className="h-4 w-4" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>

            {cart.length > 0 && (
              <motion.div variants={fadeInUp} initial="hidden" animate="show" className="p-6 border-t border-border space-y-4">
                <div className="flex items-center justify-between text-lg">
                  <span className="font-medium text-foreground">Subtotal</span>
                  <motion.span
                    key={cartTotal}
                    initial={{ scale: 1.3, color: "#22c55e" }}
                    animate={{ scale: 1, color: "inherit" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="font-bold text-foreground"
                  >
                    £{cartTotal.toFixed(2)}
                  </motion.span>
                </div>
                <Button className="w-full" size="lg" onClick={() => { setIsOpen(false); router.push("/store/checkout"); }}>
                  Proceed to Checkout
                </Button>
                <Button variant="ghost" className="w-full" onClick={clearCart}>
                  Clear Cart
                </Button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
