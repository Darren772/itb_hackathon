/**
 * 1-on-1 request chat — M5
 * Real-time WebSocket chat between seeker and group leader.
 * Leader has Approve / Reject action buttons.
 */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useWebSocketChat } from "@/hooks/useWebSocketChat";
import { api } from "@/lib/api";
import type { Message } from "@/types";
import Navbar from "@/components/layout/Navbar";
import ChatWindow from "@/components/chat/ChatWindow";
import toast from "react-hot-toast";

export default function ChatPage() {
  const { requestId } = useParams<{ requestId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const token = ""; // TODO: get from supabase session

  const { sendMessage } = useWebSocketChat({
    requestId,
    token,
    onMessage: (msg) => setMessages((prev) => [...prev, msg]),
  });

  const handleApprove = async () => {
    try {
      await api.approve(token, requestId);
      toast.success("Candidate approved! 🎉");
    } catch {
      toast.error("Failed to approve.");
    }
  };

  const handleReject = async () => {
    try {
      await api.reject(token, requestId);
      toast.success("Request rejected.");
    } catch {
      toast.error("Failed to reject.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col h-[calc(100vh-56px)]">
        {/* TODO: show fit summary banner if current user is leader */}
        <ChatWindow
          messages={messages}
          currentUserId=""  // TODO
          onSend={sendMessage}
        />
        {/* Leader action bar — conditionally render based on role */}
        <div className="flex gap-3 border-t border-slate-200 bg-white px-4 py-3">
          <button onClick={handleApprove} className="flex-1 rounded-lg bg-green-600 py-2 text-sm font-semibold text-white hover:bg-green-500">
            ✅ Approve
          </button>
          <button onClick={handleReject} className="flex-1 rounded-lg bg-red-100 py-2 text-sm font-semibold text-red-600 hover:bg-red-200">
            ❌ Reject
          </button>
        </div>
      </main>
    </>
  );
}
