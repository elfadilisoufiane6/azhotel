"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setError(null);
    setLoading(true);
    try {
      await api("/auth/login", { method: "POST", body: JSON.stringify(data) });
      router.push("/");
    } catch {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[100svh] flex items-center justify-center bg-midnight-900 p-6">
      <form onSubmit={submit} className="w-full max-w-sm bg-white rounded-xl shadow-xl p-8 space-y-5">
        <div>
          <p className="text-xs uppercase tracking-widest text-gold-500">AZ Admin</p>
          <h1 className="font-display text-3xl text-midnight-800 mt-2">Sign in</h1>
        </div>
        <Field name="email"    type="email"    label="Email" required />
        <Field name="password" type="password" label="Password" required />
        <button disabled={loading} className="btn-primary w-full justify-center">
          {loading ? "Signing in…" : "Sign in"}
        </button>
        {error && <p className="text-xs text-rose-600">{error}</p>}
      </form>
    </main>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-widest text-zinc-500">{label}</span>
      <input
        {...props}
        className="mt-2 w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:border-gold-400"
      />
    </label>
  );
}
