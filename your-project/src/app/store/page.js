"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/components/store/CartProvider";
import { storeProducts } from "@/lib/dummyData";
import { Search, ShoppingCart, Star, Plus, Minus, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/Supabase/client";
import Image from "next/image";

import Link from "next/link";

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-foreground tracking-tight">Store</h1>
            <p className="text-muted mt-2 text-lg">Discover our curated collection of premium products</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsOpen(true)}
            className="relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Cart</span>
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-danger text-white text-xs font-bold flex items-center justify-center"
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
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8"
        >
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-white text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 rounded-xl border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
                    <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                      <ShoppingCart className="h-12 w-12 text-primary/40" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-foreground text-lg">{product.name}</h3>
                    {product.category && (
                      <Badge variant="primary" className="text-xs">{product.category}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted mb-3 line-clamp-2">{product.description || ""}</p>
                  <div className="flex items-center gap-1 mb-4">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-sm font-medium text-foreground">{product.rating || 4.0}</span>
                    <span className="text-sm text-muted">({product.stock} in stock)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-foreground">£{Number(product.price).toFixed(2)}</span>
                    <Button size="sm" onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); }} className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 px-4">
            <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <Search className="h-10 w-10 text-muted" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
            <p className="text-sm text-muted max-w-sm text-center">We could not find any products matching your search criteria. Try adjusting your filters.</p>
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-medium shadow-2xl shadow-primary/30 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>View Cart</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-lg text-sm font-bold">£{cartTotal.toFixed(2)}</span>
          </button>
        </div>
      )}

      <CartDrawer />
    </motion.div>
  );
}

function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, cartTotal, isOpen, setIsOpen, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Shopping Cart</h2>
          <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 text-muted hover:text-foreground transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <ShoppingCart className="h-8 w-8 text-muted" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Your cart is empty</h3>
              <p className="text-sm text-muted mb-6">Looks like you have not added anything to your cart yet.</p>
              <Button onClick={() => setIsOpen(false)}>Continue Shopping</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-gray-50/50">
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
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-8 w-8 rounded-lg border border-border flex items-center justify-center text-muted hover:text-foreground hover:bg-white transition-colors">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-sm font-medium text-foreground w-8 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8 rounded-lg border border-border flex items-center justify-center text-muted hover:text-foreground hover:bg-white transition-colors">
                        <Plus className="h-4 w-4" />
                      </button>
                      <button onClick={() => removeFromCart(item.id)} className="ml-auto p-2 rounded-lg text-muted hover:text-danger hover:bg-danger-light transition-colors">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-border space-y-4">
            <div className="flex items-center justify-between text-lg">
              <span className="font-medium text-foreground">Subtotal</span>
              <span className="font-bold text-foreground">£{cartTotal.toFixed(2)}</span>
            </div>
            <Button className="w-full" size="lg" onClick={() => { setIsOpen(false); router.push("/store/checkout"); }}>
              Proceed to Checkout
            </Button>
            <Button variant="ghost" className="w-full" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
