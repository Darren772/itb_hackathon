"""
Storage service — Supabase private bucket for CV/resume PDFs.

CVs are stored in a private bucket with 10-minute expiring signed URLs.
Signed URLs are generated only for the group leader of a pending/chatting request
or confirmed group members.
"""
from app.core.config import settings
from app.core.security import supabase

BUCKET = "cvs"
SIGNED_URL_TTL = 600  # 10 minutes in seconds


async def upload_cv(user_id: str, file_bytes: bytes, filename: str) -> str:
    """Upload a CV PDF to private storage. Returns the storage path."""
    # TODO: implement Supabase storage upload
    path = f"{user_id}/{filename}"
    raise NotImplementedError


async def get_cv_signed_url(cv_path: str) -> str:
    """Generate a 10-minute expiring signed URL for the given CV path."""
    # TODO: call supabase.storage.from_(BUCKET).create_signed_url(...)
    raise NotImplementedError


async def delete_cv(cv_path: str) -> None:
    """Remove a CV from storage (e.g. user deletes account)."""
    # TODO: implement
    raise NotImplementedError
