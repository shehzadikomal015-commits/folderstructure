"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Store } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { localStore, generateId } from "@/lib/localStore";
import { fadeInUp, fadeInScale, springTransition, container, item } from "@/lib/motionVariants";

export default function CreateStoreModal({ open, onOpenChange, onSuccess }) {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [currency, setCurrency] = useState("£");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!user) {
      setError("You must be signed in to create a store");
      return;
    }

    setLoading(true);

    try {
      const stores = localStore.getStores();
      const existing = stores.find((s) => s.user_id === user.id);
      if (existing) {
        setError("You already have a store. Each admin can create only one store.");
        setLoading(false);
        return;
      }

      const newStore = {
        id: generateId("store"),
        user_id: user.id,
        name: name.trim(),
        description: description.trim(),
        currency,
        created_at: new Date().toISOString(),
      };

      stores.push(newStore);
      localStore.setStores(stores);

      setName("");
      setDescription("");
      setCurrency("£");
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onOpenChange(false);
        if (onSuccess) onSuccess();
      }, 1500);
    } catch (err) {
      console.error("Error creating store:", err);
      setError("Failed to create store. Please try again.");
      setLoading(false);
    }
  }

  return (
    <Modal open={open} onClose={() => onOpenChange(false)}>
      <motion.div variants={fadeInScale} initial="hidden" animate="show" exit="hidden" transition={springTransition} className="p-6 sm:p-8">
        {!success ? (
          <>
            <motion.div variants={fadeInUp} initial="hidden" animate="show" className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10">
                <Store className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Create Your Store</h2>
                <p className="text-sm text-muted">Set up your store to get started</p>
              </div>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-xl bg-danger/10 border border-danger/20"
              >
                <p className="text-sm text-danger">{error}</p>
              </motion.div>
            )}

            <motion.form variants={container} initial="hidden" animate="show" onSubmit={handleSubmit} className="space-y-4">
              <motion.div variants={item}>
                <Input
                  label="Store Name"
                  placeholder="My Awesome Store"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </motion.div>
              <motion.div variants={item}>
                <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
                <textarea
                  placeholder="Tell customers about your store..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                />
              </motion.div>
              <motion.div variants={item}>
                <label className="block text-sm font-medium text-foreground mb-1.5">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-gray-50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                >
                  <option value="£">GBP (£)</option>
                  <option value="$">USD ($)</option>
                  <option value="€">EUR (€)</option>
                </select>
              </motion.div>
              <motion.div variants={item} className="flex gap-3 pt-2">
                <Button type="button" variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" loading={loading} disabled={loading}>
                  Create Store
                </Button>
              </motion.div>
            </motion.form>
          </>
        ) : (
          <motion.div
            variants={fadeInScale}
            initial="hidden"
            animate="show"
            transition={springTransition}
            className="text-center space-y-4 py-8"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
              className="h-20 w-20 rounded-full bg-success-light flex items-center justify-center mx-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </motion.div>
            <h3 className="text-2xl font-bold text-foreground">Store Created!</h3>
            <p className="text-sm text-muted">Your store has been set up successfully.</p>
          </motion.div>
        )}
      </motion.div>
    </Modal>
  );
}
