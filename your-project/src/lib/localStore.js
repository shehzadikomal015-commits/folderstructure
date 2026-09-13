"use client";

import {
  storeProducts as defaultProducts,
  orders as defaultOrders,
  customers as defaultCustomers,
} from "@/lib/dummyData";

const STORAGE_KEYS = {
  user: "rs_user",
  users: "rs_users",
  products: "rs_products",
  orders: "rs_orders",
  customers: "rs_customers",
  stores: "rs_stores",
};

function isBrowser() {
  return typeof window !== "undefined";
}

function read(key, fallback) {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function write(key, value) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export function seedIfEmpty() {
  if (!isBrowser()) return;
  if (!window.localStorage.getItem(STORAGE_KEYS.products)) {
    write(STORAGE_KEYS.products, defaultProducts);
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.orders)) {
    write(STORAGE_KEYS.orders, defaultOrders);
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.customers)) {
    write(STORAGE_KEYS.customers, defaultCustomers);
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.users)) {
    write(STORAGE_KEYS.users, []);
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.stores)) {
    write(STORAGE_KEYS.stores, []);
  }
}

export const localStore = {
  getProducts() {
    return read(STORAGE_KEYS.products, defaultProducts);
  },
  setProducts(products) {
    write(STORAGE_KEYS.products, products);
  },
  getOrders() {
    return read(STORAGE_KEYS.orders, defaultOrders);
  },
  setOrders(orders) {
    write(STORAGE_KEYS.orders, orders);
  },
  getCustomers() {
    return read(STORAGE_KEYS.customers, defaultCustomers);
  },
  setCustomers(customers) {
    write(STORAGE_KEYS.customers, customers);
  },
  getStores() {
    return read(STORAGE_KEYS.stores, []);
  },
  setStores(stores) {
    write(STORAGE_KEYS.stores, stores);
  },
  getUsers() {
    return read(STORAGE_KEYS.users, []);
  },
  setUsers(users) {
    write(STORAGE_KEYS.users, users);
  },
  getUser() {
    return read(STORAGE_KEYS.user, null);
  },
  setUser(user) {
    write(STORAGE_KEYS.user, user);
  },
  clearUser() {
    if (!isBrowser()) return;
    window.localStorage.removeItem(STORAGE_KEYS.user);
  },
};

export function generateId(prefix = "id") {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}
