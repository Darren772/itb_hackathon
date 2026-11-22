"""
AI Service — Gemini API integration.

Responsibilities:
  AI-01: Rank group feed cards by vector similarity to seeker profile.
  AI-02: Generate "Why this group" one-line reason per card.
  AI-03: Generate candidate fit summary for leader (match, gaps, questions).
  AI-04: Natural language "Ask the agent" group search.
  AI-05: Generate icebreaker chat starters for a request.

All methods have a rule-based fallback activated when Gemini latency > 5 s or on error.
"""
import asyncio
import time
from typing import Optional
import google.generativeai as genai
from app.core.config import settings

genai.configure(api_key=settings.gemini_api_key)

EMBED_MODEL = "models/text-embedding-004"
CHAT_MODEL = "models/gemini-2.0-flash"
TIMEOUT_SECONDS = 5


async def embed_text(text: str) -> Optional[list[float]]:
    """Return a 768-dim embedding vector for the given text."""
    # TODO: implement
    raise NotImplementedError


async def rank_groups_for_seeker(seeker_id: str, group_ids: list[str]) -> list[dict]:
    """
    AI-01: Return group_ids sorted by similarity score to the seeker profile.
    Falls back to chronological order on timeout/error.
    """
    # TODO: implement vector similarity ranking
    raise NotImplementedError


async def generate_why_this_group(seeker_profile: dict, group: dict) -> str:
    """
    AI-02: Generate a one-line "Why this group" rationale for the feed card.
    """
    # TODO: prompt Gemini and return reason string
    raise NotImplementedError


async def generate_fit_summary(seeker: dict, group: dict) -> dict:
    """
    AI-03: Generate candidate fit summary for the group leader.
    Returns: {match_points, gaps, suggested_questions, summary}
    """
    # TODO: prompt Gemini with structured output
    raise NotImplementedError


async def agent_search(query: str, available_groups: list[dict]) -> dict:
    """
    AI-04: Natural language group search using Gemini function/tool calling.
    Returns: {answer: str, group_ids: list[str]}
    """
    # TODO: implement Gemini tool calling
    raise NotImplementedError


async def generate_chat_starters(seeker: dict, group: dict) -> list[str]:
    """
    AI-05: Generate icebreaker conversation starters for a join request chat.
    """
    # TODO: implement
    raise NotImplementedError


def _rule_based_rank(group_ids: list[str]) -> list[str]:
    """Deterministic fallback: return groups in newest-first order."""
    return group_ids
