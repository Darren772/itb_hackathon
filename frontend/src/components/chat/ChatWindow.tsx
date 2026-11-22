/**
 * ChatWindow — renders message history and input bar
 */
"use client";

import { useRef, useEffect, useState } from "react";
import type { Message } from "@/types";
import { Send } from "lucide-react";

interface ChatWindowProps {
  messages: Message[];
  currentUserId: string;
  onSend: (content: string) => void;
}

export default function ChatWindow({ messages, currentUserId, onSend }: ChatWindowProps) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input.trim());
    setInput("");
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Message list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => {
          const isMe = msg.sender_id === currentUserId;
          return (
            <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${isMe ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-800"}`}>
                {msg.content}
                <span className={`mt-1 block text-[10px] ${isMe ? "text-brand-200" : "text-slate-400"}`}>
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="flex gap-2 border-t border-slate-200 bg-white px-4 py-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message…"
          className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <button onClick={handleSend} className="rounded-full bg-brand-600 p-2 text-white hover:bg-brand-500">
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
