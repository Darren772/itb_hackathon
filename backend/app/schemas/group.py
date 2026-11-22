from typing import Optional, List
from pydantic import BaseModel
import uuid
from datetime import datetime


# ---- Group Schemas ----

class GroupCreate(BaseModel):
    title: str
    description: Optional[str] = None
    category: str  # course | competition | event | social
    course_code: Optional[str] = None
    target_size: int = 4
    target_grade: Optional[str] = None
    weekly_commitment_hours: Optional[int] = None
    skills_needed: List[str] = []


class GroupUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    target_grade: Optional[str] = None
    weekly_commitment_hours: Optional[int] = None
    skills_needed: Optional[List[str]] = None


class GroupCard(BaseModel):
    """Card shown in the seeker swipe feed."""
    id: uuid.UUID
    title: str
    description: Optional[str]
    category: str
    course_code: Optional[str]
    target_size: int
    current_size: int
    target_grade: Optional[str]
    weekly_commitment_hours: Optional[int]
    skills_needed: List[str]
    leader: dict               # {id, full_name, major}
    ai_reason: Optional[str]  # "Why this group" (AI-02)
    ai_score: Optional[float]
    created_at: datetime
