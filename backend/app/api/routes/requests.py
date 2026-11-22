"""
Join Requests router — the central state-machine controller.

  GET  /requests                      — List (leader: incoming; seeker: outgoing)
  POST /requests/{id}/open-chat       — pending  → chatting
  POST /requests/{id}/approve         — chatting → approved  (leader only)
  POST /requests/{id}/reject          — chatting → rejected  (leader only)
  POST /requests/{id}/withdraw        — pending|chatting → withdrawn (seeker only)
  GET  /requests/{id}/fit-summary     — Gemini fit report (AI-03, leader only)
"""
import uuid
from fastapi import APIRouter, Depends, HTTPException
from app.core.security import get_current_user
from app.schemas.request import JoinRequestPublic, FitSummary
from app.db.session import get_session
from sqlmodel.ext.asyncio.session import AsyncSession

router = APIRouter(prefix="/requests", tags=["requests"])


@router.get("", response_model=list[JoinRequestPublic])
async def list_requests(
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    """Return incoming requests (leader) or outgoing requests (seeker)."""
    # TODO: query join_requests filtered by role
    raise NotImplementedError


@router.post("/{request_id}/open-chat", response_model=JoinRequestPublic)
async def open_chat(
    request_id: uuid.UUID,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    """Leader opens the chat — transitions request from pending → chatting."""
    # TODO: verify leader, update status, notify seeker
    raise NotImplementedError


@router.post("/{request_id}/approve", response_model=JoinRequestPublic)
async def approve_request(
    request_id: uuid.UUID,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    """
    Leader approves seeker.
    Transitions chatting → approved; adds seeker to group_members;
    auto-closes/pauses listing if group is now full.
    """
    # TODO: implement state transition + notify
    raise NotImplementedError


@router.post("/{request_id}/reject", response_model=JoinRequestPublic)
async def reject_request(
    request_id: uuid.UUID,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    """Leader rejects seeker — chatting → rejected."""
    # TODO: update status + notify seeker
    raise NotImplementedError


@router.post("/{request_id}/withdraw", response_model=JoinRequestPublic)
async def withdraw_request(
    request_id: uuid.UUID,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    """Seeker withdraws pending or active request."""
    # TODO: verify seeker, update status
    raise NotImplementedError


@router.get("/{request_id}/fit-summary", response_model=FitSummary)
async def get_fit_summary(
    request_id: uuid.UUID,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    """
    AI-03: Return Gemini-generated candidate fit summary.
    Only accessible to the group leader of this request.
    """
    # TODO: verify leader; call ai_service.generate_fit_summary
    raise NotImplementedError
