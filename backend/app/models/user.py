import uuid
from datetime import datetime
from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column
from pgvector.sqlalchemy import Vector


class UserBase(SQLModel):
    email: str = Field(unique=True, index=True)
    full_name: str
    major: Optional[str] = None
    academic_year: Optional[int] = None
    bio: Optional[str] = None
    linkedin_url: Optional[str] = None
    cv_path: Optional[str] = None


class User(UserBase, table=True):
    __tablename__ = "users"

    id: Optional[uuid.UUID] = Field(default=None, primary_key=True)
    cv_embedding: Optional[List[float]] = Field(
        default=None, sa_column=Column(Vector(768))
    )
    profile_embedding: Optional[List[float]] = Field(
        default=None, sa_column=Column(Vector(768))
    )
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class UserCourse(SQLModel, table=True):
    __tablename__ = "user_courses"

    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="users.id")
    course_code: str
    course_name: Optional[str] = None
    status: str = Field(default="current")  # current | completed


class UserSkill(SQLModel, table=True):
    __tablename__ = "user_skills"

    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="users.id")
    skill: str
    is_custom: bool = False
