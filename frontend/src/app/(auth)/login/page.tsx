"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.endsWith(".itb.ac.id") && !email.endsWith("@itb.ac.id")) {
      toast.error("Only ITB email addresses are allowed.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      setSent(true);
      toast.success("Check your ITB email for the login link!");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-brand-600">OnlyPeer 🎓</h1>
          <p className="mt-2 text-slate-500">Find your perfect team at ITB</p>
        </div>

        {!sent ? (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                ITB Email
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@students.itb.ac.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500 disabled:opacity-50"
            >
              {loading ? "Sending…" : "Send Login Link"}
            </button>
          </form>
        ) : (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center text-sm text-green-700">
            Magic link sent to <strong>{email}</strong>. Click it to sign in!
          </div>
        )}
      </div>
    </main>
  );
}
