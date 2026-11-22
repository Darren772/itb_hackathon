"use client";

import { useParams, useRouter } from "next/navigation";
import { MOCK_GROUPS, MOCK_FIT_SUMMARY } from "@/lib/mock-data";
import Navbar from "@/components/layout/Navbar";
import { Avatar, CategoryBadge, SkillTag, StatChip } from "@/components/ui";
import { ArrowLeft, ChevronRight, Heart, Linkedin } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";

export default function GroupDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const group = MOCK_GROUPS.find((g) => g.id === id) ?? MOCK_GROUPS[0];
  const [swiped, setSwiped] = useState(false);

  const handleJoin = () => {
    setSwiped(true);
    toast.success("Lamaran terkirim! 🎉 Tunggu leader buka chat.", { icon: "🚀", duration: 3000 });
    setTimeout(() => router.push("/requests"), 2000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-surface-0">
      {/* Header */}
      <header className="glass sticky top-0 z-40 flex items-center gap-3 border-b border-surface-2 px-4 py-3">
        <button onClick={() => router.back()} className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-1 hover:bg-surface-2 transition-colors">
          <ArrowLeft size={18} className="text-ink-secondary" />
        </button>
        <h1 className="flex-1 truncate text-sm font-bold text-ink-primary">Detail Kelompok</h1>
      </header>

      <main className="flex-1 overflow-y-auto pb-32">
        <div className="mx-auto max-w-lg px-4 py-5 space-y-5">
          {/* Category + Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <CategoryBadge category={group.category} />
              {group.course_code && (
                <span className="font-mono text-xs font-bold bg-surface-1 text-ink-muted px-2 py-0.5 rounded-lg">
                  {group.course_code}
                </span>
              )}
            </div>
            <h2 className="text-xl font-extrabold text-ink-primary leading-tight">{group.title}</h2>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-2">
            <StatChip icon="👥" label={`${group.current_size}/${group.target_size} anggota`} />
            {group.target_grade && <StatChip icon="🎯" label={`Target ${group.target_grade}`} />}
            {group.weekly_commitment_hours && (
              <StatChip icon="⏱" label={`${group.weekly_commitment_hours} jam/minggu`} />
            )}
          </div>

          {/* Description */}
          <div className="rounded-2xl bg-white p-4 shadow-card space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted">Tentang kelompok ini</p>
            <p className="text-sm text-ink-secondary leading-relaxed">{group.description}</p>
          </div>

          {/* Skills needed */}
          {group.skills_needed.length > 0 && (
            <div className="rounded-2xl bg-white p-4 shadow-card space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted">Skill yang dicari</p>
              <div className="flex flex-wrap gap-2">
                {group.skills_needed.map((s) => <SkillTag key={s} label={s} />)}
              </div>
            </div>
          )}

          {/* AI match reason */}
          {group.ai_reason && (
            <div className="flex items-start gap-3 rounded-2xl bg-brand-50 p-4">
              <span className="text-xl">✨</span>
              <div>
                <p className="text-xs font-bold text-brand-700 mb-0.5">Kenapa cocok buat kamu?</p>
                <p className="text-sm text-brand-600">{group.ai_reason}</p>
              </div>
            </div>
          )}

          {/* Leader */}
          <div className="rounded-2xl bg-white p-4 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted mb-3">Leader</p>
            <div className="flex items-center gap-3">
              <Avatar name={group.leader.full_name} size="lg" />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-ink-primary">{group.leader.full_name}</p>
                <p className="text-xs text-ink-muted mt-0.5">{group.leader.major}</p>
              </div>
              <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-1 hover:bg-surface-2 transition-colors">
                <Linkedin size={16} className="text-ink-secondary" />
              </button>
            </div>
          </div>

          {/* AI Fit Summary (leader sees this on request) */}
          <div className="rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 to-purple-50 p-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-base">🤖</span>
              <p className="text-xs font-bold text-brand-700 uppercase tracking-wider">Ringkasan Match AI · Hanya untuk leader</p>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-xs font-semibold text-emerald-700 mb-1">✅ Cocok karena</p>
                {MOCK_FIT_SUMMARY.match_points.map((p, i) => (
                  <p key={i} className="text-xs text-ink-secondary pl-3">• {p}</p>
                ))}
              </div>
              <div>
                <p className="text-xs font-semibold text-amber-600 mb-1">⚠️ Perlu dicek</p>
                {MOCK_FIT_SUMMARY.gaps.map((g, i) => (
                  <p key={i} className="text-xs text-ink-secondary pl-3">• {g}</p>
                ))}
              </div>
              <div>
                <p className="text-xs font-semibold text-brand-600 mb-1">💬 Pertanyaan saran</p>
                {MOCK_FIT_SUMMARY.suggested_questions.map((q, i) => (
                  <p key={i} className="text-xs text-ink-secondary pl-3">{i + 1}. {q}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed CTA */}
      <div className="fixed bottom-0 left-0 right-0 glass border-t border-surface-2 p-4 pb-safe">
        <div className="mx-auto max-w-lg flex gap-3">
          <button
            onClick={() => router.back()}
            className="rounded-2xl border-2 border-surface-2 px-6 py-3 text-sm font-bold text-ink-secondary hover:bg-surface-1 active:scale-95 transition-all"
          >
            Kembali
          </button>
          <button
            onClick={handleJoin}
            disabled={swiped}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-brand-600 py-3 text-sm font-bold text-white shadow-swipe hover:bg-brand-700 disabled:opacity-60 active:scale-95 transition-all"
          >
            <Heart size={16} /> {swiped ? "Lamaran Terkirim ✓" : "Ajukan Lamaran"}
          </button>
        </div>
      </div>
    </div>
  );
}
