/**
 * Notifications page — M4
 */
"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Notification } from "@/types";
import Navbar from "@/components/layout/Navbar";
import toast from "react-hot-toast";

const ICONS: Record<string, string> = {
  new_request: "📩",
  chat_opened: "💬",
  message: "✉️",
  approved: "✅",
  rejected: "❌",
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const token = ""; // TODO
    api.getNotifications(token).then((n) => setNotifications(n as Notification[])).catch(() => toast.error("Failed to load notifications."));
  }, []);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-lg p-6 space-y-3">
        <h1 className="text-2xl font-bold">Notifications</h1>
        {notifications.length === 0 && <p className="text-slate-500 text-sm">No notifications yet.</p>}
        {notifications.map((n) => (
          <div key={n.id} className={`rounded-xl border p-4 ${n.is_read ? "bg-white border-slate-200" : "bg-brand-50 border-brand-200"}`}>
            <div className="flex items-center gap-2">
              <span>{ICONS[n.type] ?? "🔔"}</span>
              <span className="text-sm font-medium capitalize text-slate-700">{n.type.replace("_", " ")}</span>
            </div>
            <p className="mt-1 text-xs text-slate-400">{new Date(n.created_at).toLocaleString()}</p>
          </div>
        ))}
      </main>
    </>
  );
}
