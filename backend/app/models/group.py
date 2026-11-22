import uuid
from datetime import datetime
from typing import Optional, List
from sqlmodel import SQLModel, Field
from sqlalchemy import Column
from pgvector.sqlalchemy import Vector


class GroupBase(SQLModel):
    title: str
    description: Optional[str] = None
    category: str  # course | competition | event | social
    course_code: Optional[str] = None
    target_size: int = 4
    target_grade: Optional[str] = None
    weekly_commitment_hours: Optional[int] = None


class Group(GroupBase, table=True):
    __tablename__ = "groups"

    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    leader_id: uuid.UUID = Field(foreign_key="users.id")
    current_size: int = 1
    status: str = Field(default="open")  # open | paused | full | closed
    group_embedding: Optional[List[float]] = Field(
        default=None, sa_column=Column(Vector(768))
    )
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class GroupSkillNeeded(SQLModel, table=True):
    __tablename__ = "group_skills_needed"

    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    group_id: uuid.UUID = Field(foreign_key="groups.id")
    skill: str


class GroupMember(SQLModel, table=True):
    __tablename__ = "group_members"

    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    group_id: uuid.UUID = Field(foreign_key="groups.id")
    user_id: uuid.UUID = Field(foreign_key="users.id")
    role: str = "member"  # leader | member
    joined_at: datetime = Field(default_factory=datetime.utcnow)
