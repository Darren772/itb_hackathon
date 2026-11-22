/**
 * Student profile page — view/edit own profile (M1)
 */
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import type { UserPublic } from "@/types";
import Navbar from "@/components/layout/Navbar";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserPublic | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!user) return;
    const token = ""; // TODO
    api.getMe(token).then((p) => setProfile(p as UserPublic)).catch(() => toast.error("Failed to load profile."));
  }, [user]);

  if (!profile) return <div className="flex min-h-screen items-center justify-center">Loading…</div>;

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{profile.full_name}</h1>
          <button onClick={() => setEditing(!editing)} className="text-sm text-brand-600 underline">
            {editing ? "Cancel" : "Edit"}
          </button>
        </div>
        <p className="text-sm text-slate-500">{profile.email}</p>
        {profile.major && <p className="text-sm text-slate-600">{profile.major} · {profile.academic_year}</p>}
        {profile.bio && <p className="text-sm text-slate-600">{profile.bio}</p>}
        {profile.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((s) => (
              <span key={s} className="rounded-full bg-brand-50 px-3 py-1 text-xs text-brand-600">{s}</span>
            ))}
          </div>
        )}
        {/* TODO: Edit form when editing === true */}
        {editing && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
            Edit form coming soon…
          </div>
        )}
      </main>
    </>
  );
}
