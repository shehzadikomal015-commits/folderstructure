"use client";

import { useState } from "react";
import { supabase } from "@/lib/Supabase/client";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMessage("Button clicked...");

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      console.log("SUPABASE DATA:", data);
      console.log("SUPABASE ERROR:", error);

      if (error) {
        setMessage("ERROR: " + error.message);
        return;
      }

      if (data.user) {
        setMessage("SUCCESS: " + data.user.email);
      } else {
        setMessage("No user returned from Supabase");
      }
    } catch (err) {
      console.error("SIGNUP ERROR:", err);
      setMessage("Something went wrong");
    }
  }

  return (
    <main className="min-h-screen p-10">
      <h1 className="mb-6 text-3xl font-bold">
        Supabase Signup Test
      </h1>

      <form
        onSubmit={handleSignup}
        className="flex max-w-sm flex-col gap-4"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded border p-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="rounded border p-3"
        />

        <button
          type="submit"
          className="rounded bg-black p-3 text-white"
        >
          Sign Up
        </button>
      </form>

      {message && (
        <p className="mt-5 rounded bg-gray-100 p-4">
          {message}
        </p>
      )}
    </main>
  );
}