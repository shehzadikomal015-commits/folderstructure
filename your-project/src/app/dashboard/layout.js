"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardNavbar } from "@/components/dashboard/Navbar";

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
      const timer = setTimeout(() => setLoginOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Sidebar />
      <div className="pl-64 transition-all duration-300">
        <DashboardNavbar />
        <main className="p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
