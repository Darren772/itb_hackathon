"""
Profile router — GET /me, PUT /me
"""
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from app.core.security import get_current_user
from app.schemas.user import UserPublic, UserProfileUpdate
from app.db.session import get_session
from sqlmodel.ext.asyncio.session import AsyncSession

router = APIRouter(prefix="/me", tags=["profile"])


@router.get("", response_model=UserPublic)
async def get_my_profile(
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    """Return the signed-in student's full profile including courses and skills."""
    # TODO: query user, user_courses, user_skills
    raise NotImplementedError


@router.put("", response_model=UserPublic)
async def update_my_profile(
    payload: UserProfileUpdate,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    """Update profile fields and refresh profile embedding."""
    # TODO: upsert user, courses, skills; re-embed via ai_service
    raise NotImplementedError


@router.post("/cv")
async def upload_cv(
    file: UploadFile = File(...),
    current_user=Depends(get_current_user),
):
    """Upload a CV PDF to private storage (opt-in consent for AI embedding)."""
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are accepted.")
    # TODO: call storage_service.upload_cv; optionally embed with ai_service
    raise NotImplementedError
