"""
Feed & Groups router
  GET  /feed                   — AI-ranked swipeable group cards
  POST /groups                 — Create a new group listing
  GET  /groups/{id}            — Public group details
  PATCH /groups/{id}           — Update / pause / close a group
  POST /swipes                 — Record a swipe (right swipe → join_request)
"""
import uuid
from fastapi import APIRouter, Depends, Query
from app.core.security import get_current_user
from app.schemas.group import GroupCreate, GroupUpdate, GroupCard
from app.db.session import get_session
from sqlmodel.ext.asyncio.session import AsyncSession

router = APIRouter(tags=["groups"])


@router.get("/feed", response_model=list[GroupCard])
async def get_feed(
    course: str | None = Query(None),
    category: str | None = Query(None),
    major: str | None = Query(None),
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    """
    Fetch AI-ranked group cards for the current seeker.
    Excludes groups the seeker has already swiped, joined, or applied to.
    Falls back to rule-based ranking on AI timeout.
    """
    # TODO: filter open groups, call ai_service.rank_groups_for_seeker
    raise NotImplementedError


@router.post("/groups", response_model=GroupCard, status_code=201)
async def create_group(
    payload: GroupCreate,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    """Create a new group listing; creator becomes leader and first member."""
    # TODO: insert group, group_skills_needed, group_members (leader role)
    raise NotImplementedError


@router.get("/groups/{group_id}", response_model=GroupCard)
async def get_group(
    group_id: uuid.UUID,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    """Return public group details."""
    # TODO: query group + skills + leader info
    raise NotImplementedError


@router.patch("/groups/{group_id}", response_model=GroupCard)
async def update_group(
    group_id: uuid.UUID,
    payload: GroupUpdate,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    """Update group (leader only). Can pause or close the listing."""
    # TODO: verify current_user is leader, then update
    raise NotImplementedError


@router.post("/swipes", status_code=201)
async def record_swipe(
    group_id: uuid.UUID,
    direction: str,  # left | right
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    """
    Record a swipe. A right swipe automatically creates a join_request (pending).
    Returns the new join_request id on right swipe.
    """
    # TODO: insert swipe; on right → insert join_request; notify leader
    raise NotImplementedError
