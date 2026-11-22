"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { ArrowLeft, PlusCircle, X } from "lucide-react";

const CATEGORIES = [
  { value: "course",      label: "📚 Tugas Kuliah" },
  { value: "competition", label: "🏆 Kompetisi" },
  { value: "event",       label: "🎪 Event / Panitia" },
  { value: "social",      label: "🤝 Study Group" },
];

const GRADES = ["A", "A-", "AB", "B+", "B", "Lulus aja dulu"];

const POPULAR_SKILLS = [
  "Python", "JavaScript", "React", "Next.js", "FastAPI", "Node.js",
  "Figma", "Machine Learning", "PostgreSQL", "Docker", "Git",
  "User Research", "Kotlin", "Swift", "Golang",
];

export default function CreateGroupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "", description: "", category: "course",
    course_code: "", target_size: "4", target_grade: "A",
    weekly_commitment_hours: "10",
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const toggleSkill = (s: string) => {
    setSkills((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  };

  const addCustomSkill = () => {
    const s = customSkill.trim();
    if (s && !skills.includes(s)) setSkills((prev) => [...prev, s]);
    setCustomSkill("");
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    router.push("/feed");
  };

  return (
    <div className="flex min-h-screen flex-col bg-surface-0">
      <header className="glass sticky top-0 z-40 flex items-center gap-3 border-b border-surface-2 px-4 py-3">
        <button onClick={() => step === 1 ? router.back() : setStep(1)} className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-1 hover:bg-surface-2 transition-colors">
          <ArrowLeft size={18} className="text-ink-secondary" />
        </button>
        <div className="flex-1">
          <h1 className="text-sm font-bold text-ink-primary">Buat Kelompok Baru</h1>
          <p className="text-xs text-ink-muted">Langkah {step} dari 2</p>
        </div>
        {/* Progress bar */}
        <div className="h-1.5 w-24 rounded-full bg-surface-2 overflow-hidden">
          <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: step === 1 ? "50%" : "100%" }} />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-32 px-4 pt-5">
        {step === 1 ? (
          <div className="space-y-5 max-w-lg mx-auto">
            <div>
              <h2 className="text-xl font-extrabold text-ink-primary">Tentang kelompokmu</h2>
              <p className="text-sm text-ink-muted mt-1">Info dasar yang bakal muncul di swipe card orang lain.</p>
            </div>

            <Field label="Nama Kelompok" required>
              <input
                required
                placeholder="cth: Tubes MBD — nyari backend dev yang bisa SQL"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={inputCls}
              />
              <p className="text-xs text-ink-muted mt-1">Judul yang jelas = lebih banyak yang swipe kanan 😄</p>
            </Field>

            <Field label="Kategori" required>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setForm({ ...form, category: c.value })}
                    className={`rounded-xl border-2 p-3 text-left text-sm font-semibold transition-all active:scale-95 ${
                      form.category === c.value
                        ? "border-brand-500 bg-brand-50 text-brand-700"
                        : "border-surface-2 bg-white text-ink-secondary hover:border-brand-200"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </Field>

            {form.category === "course" && (
              <Field label="Kode Mata Kuliah">
                <input
                  placeholder="cth: IF3140"
                  value={form.course_code}
                  onChange={(e) => setForm({ ...form, course_code: e.target.value.toUpperCase() })}
                  className={`${inputCls} font-mono`}
                />
              </Field>
            )}

            <div className="grid grid-cols-2 gap-3">
              <Field label="Jumlah Anggota" required>
                <select value={form.target_size} onChange={(e) => setForm({ ...form, target_size: e.target.value })} className={inputCls}>
                  {[2,3,4,5,6,7,8].map((n) => (
                    <option key={n} value={n}>{n} orang</option>
                  ))}
                </select>
              </Field>
              <Field label="Target Nilai">
                <select value={form.target_grade} onChange={(e) => setForm({ ...form, target_grade: e.target.value })} className={inputCls}>
                  {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </Field>
            </div>

            <Field label="Komitmen per minggu">
              <div className="flex items-center gap-3">
                <input
                  type="range" min={2} max={30} step={1}
                  value={form.weekly_commitment_hours}
                  onChange={(e) => setForm({ ...form, weekly_commitment_hours: e.target.value })}
                  className="flex-1 accent-brand-600"
                />
                <span className="text-sm font-bold text-ink-primary w-16 text-right">{form.weekly_commitment_hours} jam</span>
              </div>
            </Field>

            <Field label="Deskripsi">
              <textarea
                rows={4}
                placeholder="Ceritain konteks tugas/kompetisinya, cara kerja tim, dan hal yang kamu cari dari calon anggota..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className={inputCls}
              />
            </Field>
          </div>
        ) : (
          <div className="space-y-5 max-w-lg mx-auto">
            <div>
              <h2 className="text-xl font-extrabold text-ink-primary">Skill yang dicari</h2>
              <p className="text-sm text-ink-muted mt-1">Ini akan muncul di card dan dipakai AI buat nge-rank kandidat.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {POPULAR_SKILLS.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSkill(s)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
                    skills.includes(s)
                      ? "bg-brand-600 text-white"
                      : "bg-surface-1 text-ink-secondary hover:bg-surface-2"
                  }`}
                >
                  {skills.includes(s) ? "✓ " : ""}{s}
                </button>
              ))}
            </div>

            {/* Custom skill input */}
            <div className="flex gap-2">
              <input
                placeholder="Tambah skill custom..."
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCustomSkill()}
                className={`${inputCls} flex-1`}
              />
              <button onClick={addCustomSkill} className="rounded-xl bg-brand-50 px-4 text-sm font-bold text-brand-600 hover:bg-brand-100 transition-colors">
                <PlusCircle size={18} />
              </button>
            </div>

            {skills.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-ink-muted mb-2">Dipilih ({skills.length})</p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span key={s} className="flex items-center gap-1 rounded-xl bg-brand-100 px-3 py-1 text-xs font-bold text-brand-700">
                      {s}
                      <button onClick={() => toggleSkill(s)} className="ml-0.5 hover:text-rose-500">
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Preview */}
            <div className="rounded-2xl border border-brand-100 bg-brand-50 p-4 space-y-1">
              <p className="text-xs font-bold text-brand-700">Preview Card</p>
              <p className="text-sm font-bold text-ink-primary">{form.title || "(Nama kelompok)"}</p>
              <p className="text-xs text-ink-muted">👥 1/{form.target_size} · 🎯 {form.target_grade} · ⏱ {form.weekly_commitment_hours}j/mgg</p>
            </div>
          </div>
        )}
      </main>

      {/* Fixed CTA */}
      <div className="fixed bottom-0 left-0 right-0 glass border-t border-surface-2 p-4">
        <div className="mx-auto max-w-lg">
          {step === 1 ? (
            <button
              onClick={() => setStep(2)}
              disabled={!form.title}
              className="w-full rounded-2xl bg-brand-600 py-3.5 text-sm font-bold text-white shadow-swipe hover:bg-brand-700 disabled:opacity-50 active:scale-95 transition-all"
            >
              Lanjut → Skill yang Dicari
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full rounded-2xl bg-brand-600 py-3.5 text-sm font-bold text-white shadow-swipe hover:bg-brand-700 disabled:opacity-60 active:scale-95 transition-all"
            >
              {loading ? "Membuat kelompok..." : "🚀 Publish Kelompok!"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-surface-2 bg-white px-4 py-3 text-sm text-ink-primary placeholder:text-ink-muted shadow-sm focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-ink-primary">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      {children}
    </div>
  );
}
