"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/components/store/CartProvider";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Star, ShoppingCart, Plus, Minus, ArrowLeft, Package } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { StoreNavbar } from "@/components/store/StoreNavbar";
import { fadeInUp, fadeInScale, slideInRight, springTransition, smoothTransition } from "@/lib/motionVariants";

export function ProductDetailClient({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const maxQty = product.stock;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <StoreNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          <Link
            href="/store"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted hover:text-foreground transition-colors mb-4 sm:mb-6"
          >
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            Back to Store
          </Link>
        </motion.div>

        <motion.div
          variants={fadeInScale}
          initial="hidden"
          animate="show"
          viewport={{ once: true, margin: "-50px" }}
          className="bg-white rounded-3xl border border-border overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden"
            >
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-primary/10 flex items-center justify-center">
                  <Package className="h-12 w-12 sm:h-16 sm:w-16 text-primary/40" />
                </div>
              )}
            </motion.div>

            <motion.div
              variants={slideInRight}
              initial="hidden"
              animate="show"
              viewport={{ once: true, margin: "-50px" }}
              className="p-6 sm:p-8 lg:p-10 flex flex-col"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <Badge variant="primary" className="text-xs mb-2 sm:mb-3">
                    {product.category || "Uncategorized"}
                  </Badge>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                    {product.name}
                  </h1>
                </div>
              </div>

              <p className="text-sm sm:text-base text-muted mb-4 sm:mb-6 leading-relaxed">
                {product.description || "No description available."}
              </p>

              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <span className="text-3xl sm:text-4xl font-bold text-foreground">
                  £{Number(product.price).toFixed(2)}
                </span>
                <Badge variant={product.stock > 0 ? "success" : "danger"}>
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </Badge>
              </div>

              {product.stock > 0 && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-xs sm:text-sm font-medium text-foreground">Quantity:</span>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        className="h-9 w-9 rounded-xl border border-border flex items-center justify-center text-muted hover:text-foreground hover:bg-gray-50 transition-colors disabled:opacity-50"
                      >
                        <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                      </motion.button>
                      <span className="text-base sm:text-lg font-bold text-foreground w-10 sm:w-12 text-center">
                        {quantity}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                        disabled={quantity >= maxQty}
                        className="h-9 w-9 rounded-xl border border-border flex items-center justify-center text-muted hover:text-foreground hover:bg-gray-50 transition-colors disabled:opacity-50"
                      >
                        <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                      </motion.button>
                    </div>
                  </div>

                  <Button size="lg" className="w-full gap-2" onClick={handleAddToCart} disabled={added}>
                    {added ? (
                      <motion.span
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="inline-flex items-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        Added to Cart!
                      </motion.span>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </div>
              )}

              {product.stock === 0 && (
                <Button size="lg" className="w-full" disabled variant="secondary">
                  Out of Stock
                </Button>
              )}

              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border grid grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gray-50 flex items-center justify-center">
                    <Package className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-xs sm:text-sm">Free Shipping</p>
                    <p className="text-xs">On orders over £100</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gray-50 flex items-center justify-center">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-xs sm:text-sm">Quality Guarantee</p>
                    <p className="text-xs">30-day returns</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
