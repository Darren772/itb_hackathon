"use client";

import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { MOCK_MESSAGES, MOCK_INCOMING_REQUESTS, MOCK_FIT_SUMMARY } from "@/lib/mock-data";
import Navbar from "@/components/layout/Navbar";
import { Avatar } from "@/components/ui";
import { ArrowLeft, Send, ChevronDown, CheckCircle2, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import type { Message } from "@/types";

export default function ChatPage() {
  const { requestId } = useParams<{ requestId: string }>();
  const router = useRouter();
  const req = MOCK_INCOMING_REQUESTS.find((r) => r.id === requestId) ?? MOCK_INCOMING_REQUESTS[0];
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [input, setInput] = useState("");
  const [showFit, setShowFit] = useState(false);
  const [approved, setApproved] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const ME_ID = "user-daffa-02"; // acting as leader

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-new-${Date.now()}`,
        request_id: requestId,
        sender_id: ME_ID,
        content: input.trim(),
        created_at: new Date().toISOString(),
      },
    ]);
    setInput("");
  };

  const handleApprove = () => {
    setApproved(true);
    toast.success(`${req.seeker.full_name} diterima ke kelompok! 🎉`, { duration: 4000 });
  };

  const handleReject = () => {
    toast("Lamaran ditolak.", { icon: "😔" });
    router.back();
  };

  return (
    <div className="flex h-screen flex-col bg-surface-0">
      {/* Header */}
      <header className="glass z-40 border-b border-surface-2 px-4 py-3 shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-1 hover:bg-surface-2 transition-colors">
            <ArrowLeft size={18} className="text-ink-secondary" />
          </button>
          <Avatar name={req.seeker.full_name} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-ink-primary">{req.seeker.full_name}</p>
            <p className="text-xs text-ink-muted truncate">{req.group.title}</p>
          </div>
          <button
            onClick={() => setShowFit(!showFit)}
            className="flex items-center gap-1.5 rounded-xl bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-600 hover:bg-brand-100 transition-colors"
          >
            ✨ AI Report
            <ChevronDown size={12} className={`transition-transform ${showFit ? "rotate-180" : ""}`} />
          </button>
        </div>
      </header>

      {/* AI Fit Summary Drawer */}
      <AnimatePresence>
        {showFit && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-brand-100 bg-gradient-to-br from-brand-50 to-purple-50 shrink-0"
          >
            <div className="px-4 py-3 space-y-2">
              <p className="text-xs font-bold text-brand-700 uppercase tracking-wider">Ringkasan AI · {req.seeker.full_name}</p>
              <p className="text-xs text-ink-secondary italic">{MOCK_FIT_SUMMARY.summary}</p>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-[10px] font-bold text-emerald-700 mb-1">✅ Cocok</p>
                  {MOCK_FIT_SUMMARY.match_points.map((p, i) => (
                    <p key={i} className="text-[10px] text-ink-secondary">• {p}</p>
                  ))}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-amber-600 mb-1">⚠️ Cek dulu</p>
                  {MOCK_FIT_SUMMARY.gaps.map((g, i) => (
                    <p key={i} className="text-[10px] text-ink-secondary">• {g}</p>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-brand-600 mb-1">💬 Saran pertanyaan</p>
                {MOCK_FIT_SUMMARY.suggested_questions.map((q, i) => (
                  <p key={i} className="text-[10px] text-ink-secondary">{i + 1}. {q}</p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg) => {
          const isMe = msg.sender_id === ME_ID;
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-end gap-2 ${isMe ? "justify-end" : "justify-start"}`}
            >
              {!isMe && <Avatar name={req.seeker.full_name} size="sm" className="shrink-0" />}
              <div
                className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  isMe
                    ? "rounded-br-sm bg-brand-600 text-white"
                    : "rounded-bl-sm bg-white text-ink-primary shadow-card"
                }`}
              >
                {msg.content}
                <span className={`mt-1 block text-[10px] ${isMe ? "text-brand-200" : "text-ink-muted"}`}>
                  {new Date(msg.created_at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </motion.div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Approved banner */}
      <AnimatePresence>
        {approved && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 mb-2 flex items-center gap-3 rounded-2xl bg-emerald-50 border border-emerald-200 p-3"
          >
            <CheckCircle2 size={20} className="shrink-0 text-emerald-500" />
            <p className="text-sm font-semibold text-emerald-700">
              {req.seeker.full_name} resmi bergabung ke kelompokmu! 🎉
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input + action bar */}
      <div className="glass border-t border-surface-2 px-4 py-3 space-y-2 shrink-0">
        {!approved && (
          <div className="flex gap-2">
            <button
              onClick={handleApprove}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-500 py-2.5 text-sm font-bold text-white hover:bg-emerald-600 active:scale-95 transition-all"
            >
              <CheckCircle2 size={15} /> Terima
            </button>
            <button
              onClick={handleReject}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-rose-50 py-2.5 text-sm font-bold text-rose-500 border border-rose-200 hover:bg-rose-100 active:scale-95 transition-all"
            >
              <XCircle size={15} /> Tolak
            </button>
          </div>
        )}
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ketik pesan..."
            className="flex-1 rounded-2xl border border-surface-2 bg-white px-4 py-2.5 text-sm placeholder:text-ink-muted focus:border-brand-300 focus:ring-2 focus:ring-brand-100 transition-all"
          />
          <button
            onClick={send}
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-600 text-white hover:bg-brand-700 active:scale-95 transition-all"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
