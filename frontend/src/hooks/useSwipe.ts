"use client";

import { useState, useCallback } from "react";
import type { GroupCard } from "@/types";

/** Minimal hook that tracks the current top card and swipe state */
export function useSwipe(cards: GroupCard[], onSwipe: (card: GroupCard, direction: "left" | "right") => void) {
  const [index, setIndex] = useState(0);

  const swipe = useCallback(
    (direction: "left" | "right") => {
      if (index >= cards.length) return;
      onSwipe(cards[index], direction);
      setIndex((i) => i + 1);
    },
    [index, cards, onSwipe],
  );

  const currentCard = cards[index] ?? null;
  const remaining = cards.length - index;

  return { currentCard, remaining, swipe };
}
