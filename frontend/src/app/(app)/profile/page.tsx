"use client";

import { ME } from "@/lib/mock-data";
import Navbar from "@/components/layout/Navbar";
import { Avatar, SkillTag } from "@/components/ui";
import { Linkedin, Edit3, BookOpen, Star } from "lucide-react";

export default function ProfilePage() {
  const user = ME;
  const currentCourses = user.courses.filter((c) => c.status === "current");
  const doneCourses = user.courses.filter((c) => c.status === "completed");

  return (
    <div className="flex min-h-screen flex-col bg-surface-0">
      <header className="glass sticky top-0 z-40 flex items-center justify-between border-b border-surface-2 px-4 py-3">
        <h1 className="text-lg font-extrabold text-ink-primary">Profilku</h1>
        <button className="flex items-center gap-1.5 rounded-xl bg-surface-1 px-3 py-2 text-xs font-bold text-ink-secondary hover:bg-surface-2 transition-colors">
          <Edit3 size={13} /> Edit
        </button>
      </header>

      <main className="flex-1 overflow-y-auto pb-nav px-4 pt-5 space-y-4">
        {/* Identity card */}
        <div className="rounded-3xl bg-white p-5 shadow-card">
          <div className="flex items-start gap-4">
            <Avatar name={user.full_name} size="xl" />
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-extrabold text-ink-primary">{user.full_name}</h2>
              <p className="text-sm text-ink-muted mt-0.5">{user.major} · Angkatan {user.academic_year}</p>
              <p className="text-xs text-ink-muted mt-0.5 truncate">{user.email}</p>
              {user.linkedin_url && (
                <a
                  href={user.linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors"
                >
                  <Linkedin size={12} /> LinkedIn
                </a>
              )}
            </div>
          </div>
          {user.bio && (
            <p className="mt-4 text-sm text-ink-secondary leading-relaxed border-t border-surface-1 pt-4">
              {user.bio}
            </p>
          )}
        </div>

        {/* Skills */}
        <div className="rounded-2xl bg-white p-4 shadow-card space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star size={15} className="text-amber-500 fill-amber-400" />
              <p className="text-sm font-bold text-ink-primary">Skills</p>
            </div>
            <button className="text-xs font-semibold text-brand-600 hover:text-brand-700">+ Tambah</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((s) => <SkillTag key={s} label={s} />)}
          </div>
        </div>

        {/* Courses */}
        <div className="rounded-2xl bg-white p-4 shadow-card space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen size={15} className="text-brand-500" />
            <p className="text-sm font-bold text-ink-primary">Mata Kuliah</p>
          </div>
          {currentCourses.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-emerald-600 mb-2">🟢 Sedang diambil</p>
              <div className="space-y-2">
                {currentCourses.map((c) => (
                  <div key={c.course_code} className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2">
                    <span className="font-mono text-xs font-bold text-emerald-700">{c.course_code}</span>
                    <span className="text-xs text-ink-secondary truncate">{c.course_name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {doneCourses.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-ink-muted mb-2">✓ Selesai</p>
              <div className="space-y-2">
                {doneCourses.map((c) => (
                  <div key={c.course_code} className="flex items-center gap-2 rounded-xl bg-surface-1 px-3 py-2">
                    <span className="font-mono text-xs font-bold text-ink-muted">{c.course_code}</span>
                    <span className="text-xs text-ink-muted truncate">{c.course_name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <button className="w-full rounded-xl border-2 border-dashed border-surface-2 py-2.5 text-xs font-semibold text-ink-muted hover:border-brand-300 hover:text-brand-600 transition-all">
            + Tambah mata kuliah
          </button>
        </div>

        {/* CV */}
        <div className="rounded-2xl bg-white p-4 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-ink-primary">CV / Resume</p>
              <p className="text-xs text-ink-muted mt-0.5">Hanya leader kelompok yang bisa lihat</p>
            </div>
            <button className="rounded-xl bg-brand-50 px-3 py-2 text-xs font-bold text-brand-600 hover:bg-brand-100 transition-colors">
              Upload PDF
            </button>
          </div>
        </div>

        {/* Danger zone */}
        <div className="rounded-2xl bg-white p-4 shadow-card">
          <button className="w-full text-left text-sm font-semibold text-rose-500 hover:text-rose-600 transition-colors">
            Keluar dari akun
          </button>
        </div>
      </main>

      <Navbar />
    </div>
  );
}
