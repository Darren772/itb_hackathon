/**
 * Group detail page — /groups/[id]
 */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import type { GroupCard } from "@/types";
import Navbar from "@/components/layout/Navbar";
import toast from "react-hot-toast";

export default function GroupDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [group, setGroup] = useState<GroupCard | null>(null);

  useEffect(() => {
    const token = ""; // TODO: get from supabase session
    api.getGroup(token, id).then((g) => setGroup(g as GroupCard)).catch(() => toast.error("Failed to load group."));
  }, [id]);

  if (!group) return <div className="flex min-h-screen items-center justify-center">Loading…</div>;

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-lg p-6 space-y-4">
        <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600 capitalize">{group.category}</span>
        <h1 className="text-2xl font-bold">{group.title}</h1>
        {group.course_code && <p className="text-sm text-slate-500">Course: {group.course_code}</p>}
        <p className="text-sm text-slate-600">{group.description}</p>
        <div className="flex gap-4 text-sm text-slate-600">
          <span>👥 {group.current_size}/{group.target_size} members</span>
          {group.target_grade && <span>🎯 {group.target_grade}</span>}
          {group.weekly_commitment_hours && <span>⏱ {group.weekly_commitment_hours}h/week</span>}
        </div>
        {group.skills_needed.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {group.skills_needed.map((s) => (
              <span key={s} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">{s}</span>
            ))}
          </div>
        )}
        <div className="text-sm text-slate-500">Leader: {group.leader.full_name} · {group.leader.major}</div>
        {group.ai_reason && (
          <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
            ✨ <strong>AI Insight:</strong> {group.ai_reason}
          </div>
        )}
      </main>
    </>
  );
}
