from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes import profile, groups, requests, chat

app = FastAPI(
    title="OnlyPeer API",
    description="Backend API for OnlyPeer — ITB campus group matchmaking platform.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(profile.router)
app.include_router(groups.router)
app.include_router(requests.router)
app.include_router(chat.router)


@app.get("/health")
async def health():
    return {"status": "ok", "service": "OnlyPeer API"}
