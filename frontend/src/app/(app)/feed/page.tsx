/**
 * /feed — Swipeable group card feed (M3)
 *
 * Fetches AI-ranked group cards from the backend and renders
 * a swipe-based discovery interface.
 */
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useSwipe } from "@/hooks/useSwipe";
import { api } from "@/lib/api";
import type { GroupCard } from "@/types";
import SwipeCard from "@/components/cards/SwipeCard";
import Navbar from "@/components/layout/Navbar";
import toast from "react-hot-toast";

export default function FeedPage() {
  const { user, loading } = useAuth();
  const [cards, setCards] = useState<GroupCard[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!user) return;
    user.getIdToken?.().then(async (token: string) => {
      try {
        const data = await api.getFeed(token) as GroupCard[];
        setCards(data);
      } catch {
        toast.error("Failed to load feed.");
      } finally {
        setFetching(false);
      }
    });
  }, [user]);

  const handleSwipe = async (card: GroupCard, direction: "left" | "right") => {
    if (!user) return;
    // TODO: get token from supabase session
    const token = ""; // placeholder
    try {
      await api.swipe(token, card.id, direction);
      if (direction === "right") toast.success("Request sent! 🎉");
    } catch {
      toast.error("Failed to record swipe.");
    }
  };

  const { currentCard, remaining, swipe } = useSwipe(cards, handleSwipe);

  if (loading || fetching) {
    return <div className="flex min-h-screen items-center justify-center">Loading…</div>;
  }

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center p-4">
        {currentCard ? (
          <SwipeCard card={currentCard} onSwipe={swipe} />
        ) : (
          <div className="text-center text-slate-500">
            <p className="text-xl font-semibold">You&apos;ve seen all groups!</p>
            <p className="mt-2 text-sm">Check back later for new listings.</p>
          </div>
        )}
        {remaining > 1 && (
          <p className="mt-4 text-xs text-slate-400">{remaining - 1} more group{remaining - 1 !== 1 ? "s" : ""} remaining</p>
        )}
      </main>
    </>
  );
}
