"""
Notification service — in-app notifications + optional email via Resend.
"""
from app.core.config import settings
import uuid


NOTIFICATION_TYPES = ("new_request", "chat_opened", "message", "approved", "rejected")


async def create_notification(
    db,
    user_id: uuid.UUID,
    type_: str,
    payload: dict | None = None,
) -> None:
    """Persist a new notification row and push via WebSocket if connected."""
    # TODO: insert into notifications table and broadcast via chat_service manager
    raise NotImplementedError


async def send_email_notification(
    to_email: str,
    subject: str,
    html_body: str,
) -> None:
    """Send a transactional email through Resend."""
    # TODO: implement using resend library
    raise NotImplementedError
