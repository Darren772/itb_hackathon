from typing import Optional
from pydantic import BaseModel
import uuid
from datetime import datetime


class SwipeCreate(BaseModel):
    group_id: uuid.UUID
    direction: str  # left | right


class JoinRequestPublic(BaseModel):
    id: uuid.UUID
    seeker_id: uuid.UUID
    group_id: uuid.UUID
    status: str
    created_at: datetime
    updated_at: datetime


class FitSummary(BaseModel):
    """Gemini-generated candidate fit report (AI-03)."""
    match_points: list[str]
    gaps: list[str]
    suggested_questions: list[str]
    summary: str


class MessageCreate(BaseModel):
    content: str


class MessagePublic(BaseModel):
    id: uuid.UUID
    request_id: uuid.UUID
    sender_id: uuid.UUID
    content: str
    created_at: datetime


class AgentAskRequest(BaseModel):
    query: str  # Natural language query (AI-04)


class AgentAskResponse(BaseModel):
    answer: str
    group_ids: list[uuid.UUID] = []
