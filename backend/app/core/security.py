from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from supabase import create_client, Client
from app.core.config import settings

bearer_scheme = HTTPBearer()

supabase: Client = create_client(settings.supabase_url, settings.supabase_service_role_key)


def validate_itb_email(email: str) -> bool:
    """Validate that an email belongs to the allowed ITB domain."""
    return email.endswith(f"@{settings.allowed_email_domain}") or email.endswith(".itb.ac.id")


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
) -> dict:
    """
    Validate Supabase JWT and return the user payload.
    Raises HTTP 401 if invalid.
    """
    token = credentials.credentials
    try:
        response = supabase.auth.get_user(token)
        if response.user is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
        return response.user
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")
