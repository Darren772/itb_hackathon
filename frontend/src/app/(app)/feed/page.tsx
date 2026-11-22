"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MOCK_GROUPS } from "@/lib/mock-data";
import SwipeCard from "@/components/cards/SwipeCard";
import Navbar from "@/components/layout/Navbar";
import { SlidersHorizontal, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import type { GroupCard } from "@/types";
import Link from "next/link";

const CATEGORIES = ["Semua", "course", "competition", "event", "social"];
const CAT_LABELS: Record<string, string> = {
  Semua: "Semua", course: "Tugas Kuliah", competition: "Kompetisi", event: "Event", social: "Study Group"
};

export default function FeedPage() {
  const [filter, setFilter] = useState("Semua");
  const [cards, setCards] = useState<GroupCard[]>(() => MOCK_GROUPS);
  const [swiped, setSwiped] = useState<{ id: string; dir: "left" | "right" }[]>([]);

  const filtered = cards.filter((c) => filter === "Semua" || c.category === filter);

  const handleSwipe = (card: GroupCard, direction: "left" | "right") => {
    setSwiped((prev) => [...prev, { id: card.id, dir: direction }]);
    setCards((prev) => prev.filter((c) => c.id !== card.id));

    if (direction === "right") {
      toast.success("Lamaran terkirim! 🎉 Tunggu leader buka chat.", {
        icon: "🚀",
        duration: 3000,
      });
    } else {
      toast("Dilewati. Ada banyak pilihan lain!", { icon: "👍", duration: 1800 });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-surface-0">
      {/* Top bar */}
      <header className="glass sticky top-0 z-40 border-b border-surface-2 px-4 pb-3 pt-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-lg font-extrabold text-ink-primary">Jelajah Kelompok</h1>
            <p className="text-xs text-ink-muted">{filtered.length} kelompok untukmu</p>
          </div>
          <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-1 hover:bg-surface-2 transition-colors">
            <SlidersHorizontal size={18} className="text-ink-secondary" />
          </button>
        </div>

        {/* Category filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
                filter === cat
                  ? "bg-brand-600 text-white shadow-sm"
                  : "bg-surface-1 text-ink-secondary hover:bg-surface-2"
              }`}
            >
              {CAT_LABELS[cat]}
            </button>
          ))}
        </div>
      </header>

      {/* AI banner */}
      <div className="mx-4 mt-3 flex items-center gap-2 rounded-xl bg-brand-50 px-3.5 py-2.5">
        <Sparkles size={15} className="shrink-0 text-brand-500" />
        <p className="text-xs font-medium text-brand-700">
          Urutan disesuaikan berdasarkan skill & mata kuliah kamu
        </p>
      </div>

      {/* Card stack */}
      <main className="relative flex flex-1 flex-col items-center px-4 pb-nav pt-4">
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center gap-4 pt-16 text-center"
          >
            <span className="text-5xl">{swiped.length > 0 ? "🎉" : "😮"}</span>
            <div>
              <p className="font-bold text-ink-primary">
                {swiped.length > 0 ? "Semua udah dijelajah!" : "Belum ada kelompok nih"}
              </p>
              <p className="mt-1 text-sm text-ink-secondary">
                {swiped.length > 0
                  ? "Pantau lamaran di tab Lamaran ya."
                  : "Coba ganti filter atau buat kelompokmu sendiri."}
              </p>
            </div>
            <div className="flex gap-3">
              {swiped.length > 0 && (
                <Link
                  href="/requests"
                  className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white shadow-swipe hover:bg-brand-700 active:scale-95 transition-all"
                >
                  Lihat Lamaranku →
                </Link>
              )}
              <Link
                href="/groups/create"
                className="rounded-xl bg-surface-1 px-5 py-2.5 text-sm font-bold text-ink-primary hover:bg-surface-2 active:scale-95 transition-all"
              >
                Buat Kelompok
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="relative w-full max-w-sm" style={{ height: 540 }}>
            {/* Back card shadow */}
            {filtered.length > 1 && (
              <div className="absolute inset-x-3 top-2 h-full rounded-3xl bg-white shadow-card opacity-50 scale-[0.97]" />
            )}
            {filtered.length > 2 && (
              <div className="absolute inset-x-6 top-4 h-full rounded-3xl bg-white shadow-card opacity-30 scale-[0.94]" />
            )}

            <AnimatePresence>
              <motion.div
                key={filtered[0].id}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                className="absolute inset-0"
              >
                <SwipeCard card={filtered[0]} onSwipe={(dir) => handleSwipe(filtered[0], dir)} isTop />
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </main>

      <Navbar />
    </div>
  );
}
