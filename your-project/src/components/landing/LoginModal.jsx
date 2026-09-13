"use client";

import { AuthModal } from "@/components/auth/AuthModal";
import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter, usePathname } from "next/navigation";

export function LoginModal({ open, onClose, onSwitchToSignup }) {
  const { login } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = async (formData) => {
    await login(formData.email, formData.password);
    if (!pathname.startsWith("/dashboard")) {
      router.push("/dashboard");
    }
  };

  return (
    <AuthModal
      open={open}
      onClose={onClose}
      onSwitchMode="signup"
      initialMode="login"
      title="Welcome back"
      subtitle="Sign in to your RevenueAI account"
      submitLabel="Sign In"
      switchLabel="Don&apos;t have an account?"
      switchActionLabel="Sign up"
      showDemo
      demoCredentials="demo@airevenue.com / 12345678"
      onSubmit={handleSubmit}
      fields={[
        { name: "email", label: "Email", type: "email", placeholder: "you@example.com", required: true },
        { name: "password", label: "Password", type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", required: true },
      ]}
    />
  );
}