"""
WebSocket connection manager for real-time 1-on-1 request chat (M5).

Each join_request has an isolated room.
Only the seeker and the group leader of that request may connect.
"""
from collections import defaultdict
from fastapi import WebSocket
import uuid


class ConnectionManager:
    def __init__(self):
        # room_id -> list of active WebSocket connections
        self._rooms: dict[str, list[WebSocket]] = defaultdict(list)

    async def connect(self, room_id: str, websocket: WebSocket):
        await websocket.accept()
        self._rooms[room_id].append(websocket)

    def disconnect(self, room_id: str, websocket: WebSocket):
        self._rooms[room_id].remove(websocket)

    async def broadcast(self, room_id: str, message: dict):
        """Send a JSON message to all participants in the room."""
        dead = []
        for ws in self._rooms[room_id]:
            try:
                await ws.send_json(message)
            except Exception:
                dead.append(ws)
        for ws in dead:
            self._rooms[room_id].remove(ws)


manager = ConnectionManager()
