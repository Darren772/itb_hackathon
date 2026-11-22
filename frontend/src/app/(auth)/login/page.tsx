"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Users, MessageSquare, Zap } from "lucide-react";

const STEPS = [
  {
    emoji: "👆",
    title: "Swipe grupnya",
    desc: "Browse kelompok yang buka lowongan. Swipe kanan kalau tertarik, kiri kalau gak cocok.",
  },
  {
    emoji: "💬",
    title: "Ngobrol dulu",
    desc: "Sebelum masuk, kamu dan leader wajib chat dulu. Biar gak ada yang kecewa di tengah jalan.",
  },
  {
    emoji: "✅",
    title: "Gabung kalau cocok",
    desc: "Leader approve, kamu masuk. Semua terekam — gak ada yang bisa ghosting sembarangan.",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"landing" | "login">("landing");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("itb.ac.id")) {
      alert("Hanya email ITB yang diperbolehkan.");
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
    setTimeout(() => router.push("/feed"), 1500);
  };

  if (step === "landing") {
    return (
      <main className="flex min-h-screen flex-col bg-surface-0">
        {/* Hero */}
        <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 pb-10 pt-16 text-center">
          {/* Background blobs */}
          <div className="pointer-events-none absolute -top-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl" />
          <div className="pointer-events-none absolute top-32 -right-10 h-56 w-56 rounded-full bg-rose-200/30 blur-3xl" />

          <div className="relative">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
              <Zap size={14} className="fill-brand-500 text-brand-500" />
              Khusus mahasiswa ITB
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-ink-primary sm:text-5xl">
              Nemu tim yang{" "}
              <span className="gradient-text">beneran cocok</span>
              <br />
              bukan cuma yang ngacung pertama
            </h1>

            <p className="mx-auto mt-5 max-w-sm text-base text-ink-secondary">
              Swipe kelompok yang butuh kamu. Ngobrol dulu, baru gabung.
              Gak ada lagi misalnya niat A tapi temennya niat lulus aja.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={() => setStep("login")}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-8 py-3.5 text-sm font-bold text-white shadow-swipe hover:bg-brand-700 active:scale-95"
              >
                Mulai Sekarang <ArrowRight size={16} />
              </button>
              <button
                onClick={() => router.push("/feed")}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-surface-1 px-8 py-3.5 text-sm font-bold text-ink-primary hover:bg-surface-2 active:scale-95"
              >
                Lihat Demo Dulu
              </button>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="px-6 pb-10">
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-ink-muted">
            Gimana caranya?
          </p>
          <div className="flex flex-col gap-4">
            {STEPS.map((s, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-2xl bg-white p-4 shadow-card"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-2xl">
                  {s.emoji}
                </span>
                <div>
                  <p className="font-bold text-ink-primary">{s.title}</p>
                  <p className="mt-0.5 text-sm text-ink-secondary">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Social proof */}
        <section className="mx-6 mb-10 rounded-2xl bg-brand-600 p-6 text-white">
          <p className="text-sm font-medium opacity-80">Kata mahasiswa ITB</p>
          <blockquote className="mt-2 text-lg font-semibold leading-snug">
            &ldquo;Dulu nyari anggota kelompok di WA, ujungnya dapat yang ghosting. OnlyPeer beda — bisa chat dulu sebelum masuk.&rdquo;
          </blockquote>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
              AN
            </div>
            <div>
              <p className="text-sm font-semibold">Anindya Nur</p>
              <p className="text-xs opacity-70">Teknik Informatika 2022</p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mx-6 mb-16 grid grid-cols-3 gap-3">
          {[
            { n: "400+", label: "Mahasiswa ITB" },
            { n: "120+", label: "Kelompok Aktif" },
            { n: "85%", label: "Sukses Match" },
          ].map(({ n, label }) => (
            <div key={label} className="rounded-2xl bg-white p-4 text-center shadow-card">
              <p className="text-2xl font-extrabold text-brand-600">{n}</p>
              <p className="mt-1 text-xs font-medium text-ink-secondary">{label}</p>
            </div>
          ))}
        </section>
      </main>
    );
  }

  // Login step
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-surface-0 px-6">
      <div className="w-full max-w-sm animate-slide-in-bottom space-y-6">
        <button
          onClick={() => setStep("landing")}
          className="text-sm text-ink-muted hover:text-ink-secondary"
        >
          ← Kembali
        </button>

        <div>
          <p className="text-3xl">🎓</p>
          <h2 className="mt-3 text-2xl font-extrabold">Masuk dengan email ITB</h2>
          <p className="mt-1 text-sm text-ink-secondary">
            Kita kirim magic link ke emailmu. Gak perlu password.
          </p>
        </div>

        {!sent ? (
          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-ink-primary mb-1.5">
                Email ITB
              </label>
              <input
                type="email"
                required
                placeholder="kamu@mahasiswa.itb.ac.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-surface-2 bg-white px-4 py-3 text-sm text-ink-primary shadow-sm placeholder:text-ink-muted focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-xl bg-brand-600 py-3 text-sm font-bold text-white shadow-swipe hover:bg-brand-700 disabled:opacity-60 active:scale-95 transition-all"
            >
              {sending ? "Mengirim..." : "Kirim Magic Link →"}
            </button>
            <p className="text-center text-xs text-ink-muted">
              Hanya email <strong>@itb.ac.id</strong> atau <strong>@mahasiswa.itb.ac.id</strong>
            </p>
          </form>
        ) : (
          <div className="animate-pop rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
            <p className="text-2xl">📬</p>
            <p className="mt-2 font-bold text-emerald-700">Magic link terkirim!</p>
            <p className="mt-1 text-sm text-emerald-600">Cek inbox {email}. Kamu akan diarahkan otomatis...</p>
          </div>
        )}
      </div>
    </main>
  );
}
