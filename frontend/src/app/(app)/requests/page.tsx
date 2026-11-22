"use client";

import { useState } from "react";
import { MOCK_INCOMING_REQUESTS, MOCK_OUTGOING_REQUESTS } from "@/lib/mock-data";
import Navbar from "@/components/layout/Navbar";
import { Avatar, CategoryBadge, StatusBadge } from "@/components/ui";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type Tab = "incoming" | "outgoing";

export default function RequestsPage() {
  const [tab, setTab] = useState<Tab>("incoming");
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-surface-0">
      <header className="glass sticky top-0 z-40 border-b border-surface-2 px-4 pb-0 pt-5">
        <h1 className="text-lg font-extrabold text-ink-primary mb-3">Lamaran</h1>
        {/* Tabs */}
        <div className="flex">
          {(["incoming", "outgoing"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative flex-1 pb-3 text-sm font-semibold transition-colors ${
                tab === t ? "text-brand-600" : "text-ink-muted"
              }`}
            >
              {t === "incoming" ? "Masuk (Leader)" : "Keluarku (Seeker)"}
              {tab === t && (
                <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-nav px-4 pt-4 space-y-3">
        <AnimatePresence mode="wait">
          {tab === "incoming" ? (
            <motion.div key="incoming" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-3">
              {MOCK_INCOMING_REQUESTS.length === 0 && (
                <EmptyState text="Belum ada yang melamar ke kelompokmu." />
              )}
              {MOCK_INCOMING_REQUESTS.map((req) => (
                <RequestCard
                  key={req.id}
                  title={req.seeker.full_name}
                  subtitle={`${req.seeker.major} · ${req.group.title}`}
                  status={req.status}
                  skills={req.seeker.skills.slice(0, 3)}
                  onPress={() => router.push(`/chat/${req.id}`)}
                  cta={req.status === "pending" ? "Buka Chat →" : "Lanjut Chat →"}
                  avatarName={req.seeker.full_name}
                  category={req.group.category}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div key="outgoing" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-3">
              {MOCK_OUTGOING_REQUESTS.length === 0 && (
                <EmptyState text="Belum pernah swipe kanan. Yuk eksplor dulu!" />
              )}
              {MOCK_OUTGOING_REQUESTS.map((req) => (
                <RequestCard
                  key={req.id}
                  title={req.group.title}
                  subtitle={`${req.group.leader.full_name} · ${req.group.leader.major}`}
                  status={req.status}
                  skills={req.group.skills_needed.slice(0, 3)}
                  onPress={() => req.status === "chatting" ? router.push(`/chat/${req.id}`) : undefined}
                  cta={req.status === "chatting" ? "Buka Chat →" : "Menunggu..."}
                  avatarName={req.group.leader.full_name}
                  category={req.group.category}
                  disabled={req.status === "pending"}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Navbar />
    </div>
  );
}

function RequestCard({
  title, subtitle, status, skills, onPress, cta, avatarName, category, disabled
}: {
  title: string; subtitle: string; status: string; skills: string[];
  onPress?: () => void; cta: string; avatarName: string; category: string; disabled?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-white p-4 shadow-card"
    >
      <div className="flex items-start gap-3">
        <Avatar name={avatarName} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <StatusBadge status={status} />
            <CategoryBadge category={category} />
          </div>
          <p className="mt-1 font-bold text-sm text-ink-primary truncate">{title}</p>
          <p className="text-xs text-ink-muted truncate mt-0.5">{subtitle}</p>
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {skills.map((s) => (
                <span key={s} className="rounded-md bg-surface-1 px-2 py-0.5 text-[11px] font-medium text-ink-secondary">
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <button
        onClick={onPress}
        disabled={disabled}
        className={`mt-3 w-full rounded-xl py-2.5 text-sm font-bold transition-all active:scale-95 ${
          disabled
            ? "bg-surface-1 text-ink-muted cursor-default"
            : "bg-brand-600 text-white shadow-sm hover:bg-brand-700"
        }`}
      >
        {cta}
      </button>
    </motion.div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <span className="text-4xl">📭</span>
      <p className="text-sm text-ink-secondary">{text}</p>
    </div>
  );
}
