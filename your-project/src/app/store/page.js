"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/components/store/CartProvider";
import { storeProducts } from "@/lib/dummyData";
import { Search, ShoppingCart, Star, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/Supabase/client";
import Image from "next/image";
import Link from "next/link";
import { StoreNavbar } from "@/components/store/StoreNavbar";
import { CartDrawer } from "@/components/store/CartDrawer";

export default function StorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { addToCart, cart, removeFromCart, updateQuantity, cartTotal, setIsOpen } = useCart();

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } else if (data && data.length > 0) {
        setProducts(data);
      } else {
        setProducts(storeProducts);
      }
      setLoading(false);
    }

    loadProducts();
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category).filter(Boolean))];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50/50"
    >
      <StoreNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">Store</h1>
            <p className="text-muted mt-1 sm:mt-2 text-sm sm:text-lg">Discover our curated collection of premium products</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsOpen(true)}
            className="relative inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
          >
            <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base">Cart</span>
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-danger text-white text-[10px] sm:text-xs font-bold flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 sm:mb-8"
        >
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-xl border border-border bg-white text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm sm:text-base"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 sm:py-3 rounded-xl border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm sm:text-base w-full sm:w-auto"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20 sm:py-24">
            <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredProducts.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08 },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
          >
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                  {product.image_url || product.image ? (
                    <Image
                      src={product.image_url || product.image}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-primary/10 flex items-center justify-center">
                      <ShoppingCart className="h-10 w-10 sm:h-12 sm:w-12 text-primary/40" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-foreground text-base sm:text-lg">{product.name}</h3>
                    {product.category && (
                      <Badge variant="primary" className="text-xs">{product.category}</Badge>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-muted mb-2 sm:mb-3 line-clamp-2">{product.description || ""}</p>
                  <div className="flex items-center gap-1 mb-3 sm:mb-4">
                    <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-accent text-accent" />
                    <span className="text-xs sm:text-sm font-medium text-foreground">{product.rating || 4.0}</span>
                    <span className="text-xs sm:text-sm text-muted">({product.stock} in stock)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg sm:text-2xl font-bold text-foreground">£{Number(product.price).toFixed(2)}</span>
                    <Button size="sm" onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); }} className="gap-2">
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 sm:py-24 px-4">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-gray-100 flex items-center justify-center mb-5 sm:mb-6">
              <Search className="h-8 w-8 sm:h-10 sm:w-10 text-muted" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">No products found</h3>
            <p className="text-sm text-muted max-w-sm text-center">We could not find any products matching your search criteria. Try adjusting your filters.</p>
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-medium shadow-xl shadow-primary/30 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base">View Cart</span>
            <span className="bg-white/20 px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-md sm:rounded-lg text-xs sm:text-sm font-bold">£{cartTotal.toFixed(2)}</span>
          </button>
        </div>
      )}

      <CartDrawer />
    </motion.div>
  );
}
