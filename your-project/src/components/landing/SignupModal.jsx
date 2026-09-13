"use client";

import { AuthModal } from "@/components/auth/AuthModal";
import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter, usePathname } from "next/navigation";

export function SignupModal({ open, onClose, onSwitchToLogin }) {
  const { signup } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      throw new Error("Passwords do not match");
    }
    if (formData.password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
    await signup(formData.name, formData.email, formData.password);
    onClose();
    if (!pathname.startsWith("/dashboard")) {
      router.push("/dashboard");
    }
  };

  return (
    <AuthModal
      open={open}
      onClose={onClose}
      onSwitchMode="login"
      initialMode="signup"
      title="Create your account"
      subtitle="Start recovering lost revenue today"
      submitLabel="Create Account"
      switchLabel="Already have an account?"
      switchActionLabel="Sign in"
      onSubmit={handleSubmit}
      fields={[
        { name: "name", label: "Full Name", type: "text", placeholder: "John Doe", required: true },
        { name: "email", label: "Email", type: "email", placeholder: "you@example.com", required: true },
        { name: "password", label: "Password", type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", required: true },
        { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", required: true },
      ]}
    />
  );
}