"use client";

import { useState } from "react";
import { MOCK_NOTIFICATIONS } from "@/lib/mock-data";
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import type { Notification } from "@/types";

const NOTIF_META: Record<string, { icon: string; label: string; color: string }> = {
  approved:    { icon: "🎉", label: "Lamaran Diterima",  color: "bg-emerald-50 border-emerald-200" },
  rejected:    { icon: "😔", label: "Lamaran Ditolak",   color: "bg-rose-50 border-rose-100" },
  message:     { icon: "💬", label: "Pesan Baru",        color: "bg-brand-50 border-brand-100" },
  chat_opened: { icon: "🔓", label: "Chat Dibuka",       color: "bg-brand-50 border-brand-100" },
  new_request: { icon: "📩", label: "Lamaran Masuk",     color: "bg-amber-50 border-amber-100" },
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} menit lalu`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} jam lalu`;
  return `${Math.floor(hrs / 24)} hari lalu`;
}

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(MOCK_NOTIFICATIONS);
  const router = useRouter();
  const unread = notifs.filter((n) => !n.is_read).length;

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, is_read: true })));

  const handleTap = (n: Notification) => {
    setNotifs((prev) => prev.map((x) => x.id === n.id ? { ...x, is_read: true } : x));
    if (n.type === "message" || n.type === "chat_opened" || n.type === "approved") {
      const reqId = (n.payload as { request_id?: string })?.request_id;
      if (reqId) router.push(`/chat/${reqId}`);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-surface-0">
      <header className="glass sticky top-0 z-40 border-b border-surface-2 px-4 pb-3 pt-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-extrabold text-ink-primary">Notifikasi</h1>
            {unread > 0 && <p className="text-xs text-brand-600 font-semibold mt-0.5">{unread} belum dibaca</p>}
          </div>
          {unread > 0 && (
            <button onClick={markAllRead} className="text-xs font-semibold text-ink-muted hover:text-brand-600 transition-colors">
              Tandai semua dibaca
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-nav px-4 pt-4 space-y-2">
        {notifs.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <span className="text-4xl">🔔</span>
            <p className="text-sm text-ink-secondary">Belum ada notifikasi.</p>
          </div>
        )}
        {notifs.map((n, i) => {
          const meta = NOTIF_META[n.type] ?? { icon: "🔔", label: n.type, color: "bg-white border-surface-2" };
          const payload = n.payload as Record<string, string> | null;
          return (
            <motion.button
              key={n.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => handleTap(n)}
              className={`w-full rounded-2xl border p-4 text-left transition-all active:scale-[.98] ${meta.color} ${!n.is_read ? "shadow-sm" : "opacity-75"}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl shrink-0 mt-0.5">{meta.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-ink-primary">{meta.label}</p>
                    {!n.is_read && <span className="h-1.5 w-1.5 rounded-full bg-brand-500 shrink-0" />}
                  </div>
                  {payload?.group_title && (
                    <p className="text-sm font-semibold text-ink-primary mt-0.5 truncate">{payload.group_title}</p>
                  )}
                  {payload?.sender_name && (
                    <p className="text-xs text-ink-secondary mt-0.5">dari {payload.sender_name}</p>
                  )}
                  <p className="mt-1 text-xs text-ink-muted">{timeAgo(n.created_at)}</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </main>

      <Navbar />
    </div>
  );
}
