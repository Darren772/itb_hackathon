/**
 * Create a new group listing (M2)
 */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import toast from "react-hot-toast";

const CATEGORIES = ["course", "competition", "event", "social"] as const;

export default function CreateGroupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "course",
    course_code: "",
    target_size: 4,
    target_grade: "",
    weekly_commitment_hours: "",
    skills_needed: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = ""; // TODO: get from supabase session
    try {
      const payload = {
        ...form,
        target_size: Number(form.target_size),
        weekly_commitment_hours: form.weekly_commitment_hours
          ? Number(form.weekly_commitment_hours)
          : undefined,
        skills_needed: form.skills_needed
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };
      await api.createGroup(token, payload);
      toast.success("Group created!");
      router.push("/feed");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to create group.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-lg p-6">
        <h1 className="mb-6 text-2xl font-bold">Create a Group</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Title *">
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Description">
            <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Category *">
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Course Code (if applicable)">
            <input placeholder="e.g. IF2210" value={form.course_code} onChange={(e) => setForm({ ...form, course_code: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Target Group Size">
            <input type="number" min={2} max={20} value={form.target_size} onChange={(e) => setForm({ ...form, target_size: Number(e.target.value) })} className={inputCls} />
          </Field>
          <Field label="Target Grade (optional)">
            <input placeholder="e.g. A, A-" value={form.target_grade} onChange={(e) => setForm({ ...form, target_grade: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Weekly Commitment (hours, optional)">
            <input type="number" min={1} value={form.weekly_commitment_hours} onChange={(e) => setForm({ ...form, weekly_commitment_hours: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Skills Needed (comma-separated)">
            <input placeholder="Python, React, ML" value={form.skills_needed} onChange={(e) => setForm({ ...form, skills_needed: e.target.value })} className={inputCls} />
          </Field>
          <button type="submit" disabled={loading} className="w-full rounded-lg bg-brand-600 py-2 text-sm font-semibold text-white hover:bg-brand-500 disabled:opacity-50">
            {loading ? "Creating…" : "Create Group"}
          </button>
        </form>
      </main>
    </>
  );
}

const inputCls = "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
  );
}
