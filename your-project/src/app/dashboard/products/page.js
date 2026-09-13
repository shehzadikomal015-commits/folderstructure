import { createServerClient } from "@/lib/Supabase/server";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Download,
  RefreshCw,
  MoreVertical,
  Package,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const dynamic = "force-dynamic";

export default async function DashboardProductsPage() {
  const supabase = await createServerClient();

  if (!supabase) {
    return (
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">
          <h2 className="text-xl font-bold text-yellow-800 mb-2">Supabase Not Configured</h2>
          <p className="text-yellow-700">Please configure your Supabase environment variables to view products.</p>
        </div>
      </div>
    );
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/");
  }

  let allProducts = [];
  try {
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (productsError) {
      console.error("Error fetching products:", productsError);
      allProducts = [];
    } else {
      allProducts = products || [];
    }
  } catch (err) {
    console.error("Unexpected error fetching products:", err);
    allProducts = [];
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto space-y-6 sm:space-y-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Products
          </h1>
          <p className="text-sm text-muted mt-1">
            Manage your product catalog and track performance.
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="secondary" size="sm">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="ghost" size="sm">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl border border-border p-4 sm:p-6"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <p className="text-xs sm:text-sm font-medium text-muted">Total Products</p>
            <Package className="h-4 w-4 sm:h-5 sm:w-5 text-muted" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-foreground">{allProducts.length}</p>
          <p className="text-xs sm:text-sm text-success mt-1">Active catalog</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="bg-white rounded-2xl border border-border p-4 sm:p-6"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <p className="text-xs sm:text-sm font-medium text-muted">Total Stock</p>
            <Package className="h-4 w-4 sm:h-5 sm:w-5 text-muted" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-foreground">
            {allProducts.reduce((sum, p) => sum + (p.stock || 0), 0)}
          </p>
          <p className="text-xs sm:text-sm text-muted mt-1">Units available</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-2xl border border-border p-4 sm:p-6"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <p className="text-xs sm:text-sm font-medium text-muted">Avg Price</p>
            <Package className="h-4 w-4 sm:h-5 sm:w-5 text-muted" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-foreground">
            £{allProducts.length > 0 ? (allProducts.reduce((sum, p) => sum + Number(p.price), 0) / allProducts.length).toFixed(2) : "0.00"}
          </p>
          <p className="text-xs sm:text-sm text-muted mt-1">Average price</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="bg-white rounded-2xl border border-border p-4 sm:p-6"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <p className="text-xs sm:text-sm font-medium text-muted">Categories</p>
            <Package className="h-4 w-4 sm:h-5 sm:w-5 text-muted" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-foreground">
            {new Set(allProducts.map((p) => p.category).filter(Boolean)).size}
          </p>
          <p className="text-xs sm:text-sm text-muted mt-1">Product categories</p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-2xl border border-border p-4 sm:p-6"
      >
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-foreground">Product Catalog</h2>
            <p className="text-xs sm:text-sm text-muted">Manage your products</p>
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80">
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-4 sm:px-6 py-3 sm:py-4">
                  Product
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-4 sm:px-6 py-3 sm:py-4">
                  Category
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-4 sm:px-6 py-3 sm:py-4">
                  Price
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-4 sm:px-6 py-3 sm:py-4">
                  Stock
                </th>
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-4 sm:px-6 py-3 sm:py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {allProducts.length > 0 ? (
                allProducts.map((product, idx) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          <Package className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div>
                          <span className="font-medium text-foreground block text-sm sm:text-base">
                            {product.name}
                          </span>
                          <span className="text-xs text-muted">
                            {product.description ? product.description.slice(0, 50) + (product.description.length > 50 ? "..." : "") : ""}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <Badge variant="primary" className="text-xs">{product.category || "Uncategorized"}</Badge>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-foreground font-medium">
                      £{Number(product.price).toFixed(2)}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <span className={`text-sm font-medium ${product.stock > 0 ? "text-success" : "text-danger"}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 text-muted hover:text-foreground transition-colors">
                          <Pencil className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                        <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 text-muted hover:text-danger transition-colors">
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>
                    <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4">
                      <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <Package className="h-7 w-7 sm:h-8 sm:w-8 text-muted" />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">
                        No products yet
                      </h3>
                      <p className="text-xs sm:text-sm text-muted mb-5 sm:mb-6 max-w-sm text-center">
                        Get started by adding your first product to the catalog.
                      </p>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4" />
                        Add Product
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
