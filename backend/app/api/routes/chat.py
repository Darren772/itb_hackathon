"""
Real-time chat WebSocket endpoint + notification feed.

  WS  /chats/{request_id}    — Bi-directional 1-on-1 chat (seeker ↔ leader)
  GET  /notifications         — Fetch user notification feed
  POST /agent/ask             — Natural-language group search (AI-04)
"""
import uuid
from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect, Query
from app.core.security import get_current_user
from app.schemas.request import AgentAskRequest, AgentAskResponse, MessagePublic
from app.services.chat_service import manager
from app.db.session import get_session
from sqlmodel.ext.asyncio.session import AsyncSession

router = APIRouter(tags=["chat"])


@router.websocket("/chats/{request_id}")
async def websocket_chat(
    request_id: uuid.UUID,
    websocket: WebSocket,
    token: str = Query(...),  # JWT passed as query param
    db: AsyncSession = Depends(get_session),
):
    """
    WebSocket stream for the 1-on-1 request chat.
    Auth: JWT passed as ?token= query parameter.
    Only the seeker and the group leader of this request may connect.
    Messages are persisted to the messages table.
    """
    room_id = str(request_id)
    await manager.connect(room_id, websocket)
    try:
        while True:
            data = await websocket.receive_json()
            # TODO: validate sender, persist message, broadcast to room
            await manager.broadcast(room_id, data)
    except WebSocketDisconnect:
        manager.disconnect(room_id, websocket)


@router.get("/notifications")
async def get_notifications(
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    """Return the user's notification feed (newest first, unread first)."""
    # TODO: query notifications table
    raise NotImplementedError


@router.post("/agent/ask", response_model=AgentAskResponse)
async def agent_ask(
    payload: AgentAskRequest,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    """
    AI-04: Natural language group search using Gemini tool calling.
    Example: "Find a group for Algorithms strong in Python, free weekday evenings"
    """
    # TODO: call ai_service.agent_search with available open groups
    raise NotImplementedError
