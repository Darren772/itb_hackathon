"use client";

import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import type { GroupCard } from "@/types";
import { X, Heart, ChevronRight } from "lucide-react";
import { CategoryBadge, SkillTag, StatChip } from "@/components/ui";
import { Avatar } from "@/components/ui";
import Link from "next/link";
import { useState } from "react";

interface SwipeCardProps {
  card: GroupCard;
  onSwipe: (direction: "left" | "right") => void;
  isTop?: boolean;
}

export default function SwipeCard({ card, onSwipe, isTop = true }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 220], [-18, 18]);
  const likeOpacity = useTransform(x, [30, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-120, -30], [1, 0]);
  const bgGreen = useTransform(x, [0, 120], ["rgba(16,185,129,0)", "rgba(16,185,129,0.1)"]);
  const bgRed = useTransform(x, [-120, 0], ["rgba(244,63,94,0.1)", "rgba(244,63,94,0)"]);
  const [expanded, setExpanded] = useState(false);

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const threshold = Math.abs(info.velocity.x) > 400 ? 80 : 120;
    if (info.offset.x > threshold) onSwipe("right");
    else if (info.offset.x < -threshold) onSwipe("left");
  };

  if (!isTop) {
    return (
      <div className="absolute inset-x-0 top-2 mx-auto max-w-sm scale-95 rounded-3xl bg-white shadow-card opacity-60 h-28" />
    );
  }

  return (
    <motion.div
      style={{ x, rotate, background: bgGreen }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      className="drag-card relative mx-auto w-full max-w-sm rounded-3xl bg-white shadow-card select-none"
      whileTap={{ scale: 0.98 }}
    >
      {/* Nope overlay */}
      <motion.div style={{ background: bgRed }} className="absolute inset-0 rounded-3xl pointer-events-none" />

      {/* LIKE badge */}
      <motion.div
        style={{ opacity: likeOpacity }}
        className="absolute left-5 top-5 z-10 rotate-[-20deg] rounded-xl border-[3px] border-emerald-500 px-3 py-1 text-lg font-black text-emerald-500"
      >
        MASUK!
      </motion.div>
      {/* NOPE badge */}
      <motion.div
        style={{ opacity: nopeOpacity }}
        className="absolute right-5 top-5 z-10 rotate-[20deg] rounded-xl border-[3px] border-rose-500 px-3 py-1 text-lg font-black text-rose-500"
      >
        SKIP
      </motion.div>

      <div className="p-5 space-y-3">
        {/* Header */}
        <div className="flex items-start gap-3">
          <Avatar name={card.leader.full_name} size="md" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <CategoryBadge category={card.category} />
              {card.course_code && (
                <span className="text-xs font-mono font-semibold text-ink-muted bg-surface-1 px-2 py-0.5 rounded-lg">
                  {card.course_code}
                </span>
              )}
            </div>
            <h2 className="mt-1.5 text-base font-bold leading-tight text-ink-primary line-clamp-2">
              {card.title}
            </h2>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-2">
          <StatChip icon="👥" label={`${card.current_size}/${card.target_size} anggota`} />
          {card.target_grade && <StatChip icon="🎯" label={`Target ${card.target_grade}`} />}
          {card.weekly_commitment_hours && (
            <StatChip icon="⏱" label={`${card.weekly_commitment_hours} jam/minggu`} />
          )}
        </div>

        {/* Description */}
        <p className={`text-sm text-ink-secondary leading-relaxed ${expanded ? "" : "line-clamp-3"}`}>
          {card.description}
        </p>
        {(card.description?.length ?? 0) > 120 && (
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
            className="text-xs font-semibold text-brand-600 hover:text-brand-700"
          >
            {expanded ? "Sembunyikan" : "Baca selengkapnya"}
          </button>
        )}

        {/* Skills needed */}
        {card.skills_needed.length > 0 && (
          <div>
            <p className="mb-1.5 text-xs font-semibold text-ink-muted uppercase tracking-wider">Yang dibutuhin</p>
            <div className="flex flex-wrap gap-1.5">
              {card.skills_needed.map((s) => <SkillTag key={s} label={s} />)}
            </div>
          </div>
        )}

        {/* AI reason */}
        {card.ai_reason && (
          <div className="flex items-start gap-2 rounded-xl bg-brand-50 p-3">
            <span className="text-base">✨</span>
            <p className="text-xs font-medium text-brand-700 leading-relaxed">{card.ai_reason}</p>
          </div>
        )}

        {/* Leader */}
        <div className="flex items-center justify-between pt-1 border-t border-surface-1">
          <div className="flex items-center gap-2">
            <span className="text-xs text-ink-muted">Leader:</span>
            <span className="text-xs font-semibold text-ink-primary">{card.leader.full_name}</span>
            {card.leader.major && (
              <span className="text-xs text-ink-muted">· {card.leader.major.split(" ").slice(-1)[0]}</span>
            )}
          </div>
          <Link
            href={`/groups/${card.id}`}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-0.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
          >
            Detail <ChevronRight size={12} />
          </Link>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 border-t border-surface-1 p-4">
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => { e.stopPropagation(); onSwipe("left"); }}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl border-2 border-rose-200 py-3 text-sm font-bold text-rose-500 hover:bg-rose-50 active:scale-95 transition-all"
        >
          <X size={16} /> Skip
        </button>
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => { e.stopPropagation(); onSwipe("right"); }}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-brand-600 py-3 text-sm font-bold text-white shadow-swipe hover:bg-brand-700 active:scale-95 transition-all"
        >
          <Heart size={16} /> Mau Masuk!
        </button>
      </div>
    </motion.div>
  );
}
