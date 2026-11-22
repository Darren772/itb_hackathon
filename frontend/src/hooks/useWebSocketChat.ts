"use client";

import { useEffect, useRef, useCallback } from "react";
import type { Message } from "@/types";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:8000";

interface UseWebSocketChatOptions {
  requestId: string;
  token: string;
  onMessage: (msg: Message) => void;
}

export function useWebSocketChat({ requestId, token, onMessage }: UseWebSocketChatOptions) {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}/chats/${requestId}?token=${token}`);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data) as Message;
      onMessage(msg);
    };

    ws.onerror = (err) => console.error("WebSocket error:", err);

    return () => {
      ws.close();
    };
  }, [requestId, token]);

  const sendMessage = useCallback((content: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ content }));
    }
  }, []);

  return { sendMessage };
}
