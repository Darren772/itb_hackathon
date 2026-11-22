import uuid
from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel, Field


class Swipe(SQLModel, table=True):
    __tablename__ = "swipes"

    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    seeker_id: uuid.UUID = Field(foreign_key="users.id")
    group_id: uuid.UUID = Field(foreign_key="groups.id")
    direction: str  # left | right
    created_at: datetime = Field(default_factory=datetime.utcnow)


class JoinRequest(SQLModel, table=True):
    __tablename__ = "join_requests"

    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    seeker_id: uuid.UUID = Field(foreign_key="users.id")
    group_id: uuid.UUID = Field(foreign_key="groups.id")
    # State machine: pending -> chatting -> approved | rejected | withdrawn
    status: str = Field(default="pending")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class Message(SQLModel, table=True):
    __tablename__ = "messages"

    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    request_id: uuid.UUID = Field(foreign_key="join_requests.id")
    sender_id: uuid.UUID = Field(foreign_key="users.id")
    content: str
    created_at: datetime = Field(default_factory=datetime.utcnow)


class Notification(SQLModel, table=True):
    __tablename__ = "notifications"

    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key="users.id")
    # new_request | chat_opened | message | approved | rejected
    type: str
    payload: Optional[dict] = None
    is_read: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
