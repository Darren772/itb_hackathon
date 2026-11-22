/**
 * SwipeCard — Animated swipe card for the feed (M3)
 * Uses Framer Motion for drag-to-swipe gesture.
 */
"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import type { GroupCard } from "@/types";
import { X, Heart } from "lucide-react";

interface SwipeCardProps {
  card: GroupCard;
  onSwipe: (direction: "left" | "right") => void;
}

export default function SwipeCard({ card, onSwipe }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x > 100) onSwipe("right");
    else if (info.offset.x < -100) onSwipe("left");
  };

  return (
    <motion.div
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="relative w-full max-w-sm cursor-grab select-none rounded-2xl bg-white shadow-xl"
    >
      {/* LIKE badge */}
      <motion.div style={{ opacity: likeOpacity }} className="absolute left-4 top-6 rotate-[-20deg] rounded border-4 border-green-500 px-3 py-1 text-xl font-bold text-green-500">
        JOIN
      </motion.div>
      {/* NOPE badge */}
      <motion.div style={{ opacity: nopeOpacity }} className="absolute right-4 top-6 rotate-[20deg] rounded border-4 border-red-500 px-3 py-1 text-xl font-bold text-red-500">
        SKIP
      </motion.div>

      <div className="p-6 space-y-3">
        <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600 capitalize">{card.category}</span>
        <h2 className="text-xl font-bold text-slate-800">{card.title}</h2>
        {card.course_code && <p className="text-sm text-slate-500">📚 {card.course_code}</p>}
        <p className="text-sm text-slate-600 line-clamp-3">{card.description}</p>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-slate-500">👥 {card.current_size}/{card.target_size}</span>
          {card.target_grade && <span className="text-xs text-slate-500">🎯 {card.target_grade}</span>}
          {card.weekly_commitment_hours && <span className="text-xs text-slate-500">⏱ {card.weekly_commitment_hours}h/wk</span>}
        </div>

        {card.skills_needed.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {card.skills_needed.map((s) => (
              <span key={s} className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{s}</span>
            ))}
          </div>
        )}

        {card.ai_reason && (
          <div className="rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-700">
            ✨ {card.ai_reason}
          </div>
        )}

        <p className="text-xs text-slate-400">By {card.leader.full_name} · {card.leader.major}</p>
      </div>

      {/* Button row */}
      <div className="flex border-t border-slate-100 p-4 gap-4">
        <button onClick={() => onSwipe("left")} className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-red-200 py-2 text-sm font-medium text-red-500 hover:bg-red-50">
          <X size={16} /> Skip
        </button>
        <button onClick={() => onSwipe("right")} className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-brand-600 py-2 text-sm font-medium text-white hover:bg-brand-500">
          <Heart size={16} /> Join
        </button>
      </div>
    </motion.div>
  );
}
