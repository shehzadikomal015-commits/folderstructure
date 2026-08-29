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
            <ArrowLeft className="h-4 w-4" />
            Back to Store
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-3xl border border-border overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-0">
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center">
                  <Package className="h-16 w-16 text-primary/40" />
                </div>
              )}
            </div>

            <div className="p-8 lg:p-10 flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <Badge variant="primary" className="text-xs mb-3">
                    {product.category || "Uncategorized"}
                  </Badge>
                  <h1 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                    {product.name}
                  </h1>
                </div>
              </div>

              <p className="text-muted text-lg mb-6 leading-relaxed">
                {product.description || "No description available."}
              </p>

              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-bold text-foreground">
                  £{Number(product.price).toFixed(2)}
                </span>
                <Badge variant={product.stock > 0 ? "success" : "danger"}>
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </Badge>
              </div>

              {product.stock > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-foreground">Quantity:</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        className="h-10 w-10 rounded-xl border border-border flex items-center justify-center text-muted hover:text-foreground hover:bg-gray-50 transition-colors disabled:opacity-50"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-lg font-bold text-foreground w-12 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                        disabled={quantity >= maxQty}
                        className="h-10 w-10 rounded-xl border border-border flex items-center justify-center text-muted hover:text-foreground hover:bg-gray-50 transition-colors disabled:opacity-50"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full gap-2"
                    onClick={handleAddToCart}
                    disabled={added}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {added ? "Added to Cart!" : "Add to Cart"}
                  </Button>
                </div>
              )}

              {product.stock === 0 && (
                <Button size="lg" className="w-full" disabled variant="secondary">
                  Out of Stock
                </Button>
              )}

              <div className="mt-8 pt-8 border-t border-border grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-sm text-muted">
                  <div className="h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center">
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Free Shipping</p>
                    <p>On orders over £100</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted">
                  <div className="h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center">
                    <Star className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Quality Guarantee</p>
                    <p>30-day returns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
