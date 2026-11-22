from typing import Optional, List
from pydantic import BaseModel, EmailStr
import uuid
from datetime import datetime


# ---- User Schemas ----

class UserProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    major: Optional[str] = None
    academic_year: Optional[int] = None
    bio: Optional[str] = None
    linkedin_url: Optional[str] = None
    courses: Optional[List[dict]] = None   # [{course_code, course_name, status}]
    skills: Optional[List[str]] = None


class UserPublic(BaseModel):
    id: uuid.UUID
    email: str
    full_name: str
    major: Optional[str]
    academic_year: Optional[int]
    bio: Optional[str]
    linkedin_url: Optional[str]
    skills: List[str] = []
    courses: List[dict] = []
    created_at: datetime
