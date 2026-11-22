/**
 * Requests page — M4
 * Leaders see incoming requests; seekers see their outgoing requests.
 */
"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { JoinRequest } from "@/types";
import Navbar from "@/components/layout/Navbar";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  chatting: "bg-blue-100 text-blue-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  withdrawn: "bg-slate-100 text-slate-500",
};

export default function RequestsPage() {
  const [requests, setRequests] = useState<JoinRequest[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = ""; // TODO
    api.listRequests(token).then((r) => setRequests(r as JoinRequest[])).catch(() => toast.error("Failed to load requests."));
  }, []);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold">Requests</h1>
        {requests.length === 0 && <p className="text-slate-500 text-sm">No requests yet.</p>}
        {requests.map((req) => (
          <div
            key={req.id}
            onClick={() => router.push(`/chat/${req.id}`)}
            className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Request #{req.id.slice(0, 8)}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[req.status] ?? ""}`}>
                {req.status}
              </span>
            </div>
            <p className="text-xs text-slate-400">{new Date(req.created_at).toLocaleString()}</p>
          </div>
        ))}
      </main>
    </>
  );
}
