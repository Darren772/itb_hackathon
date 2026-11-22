"""
Tests for the join_request state machine.

State transitions:
  pending -> chatting (leader opens chat)
  chatting -> approved (leader approves)
  chatting -> rejected (leader rejects)
  pending|chatting -> withdrawn (seeker withdraws)
"""
import pytest


@pytest.mark.asyncio
async def test_health(client):
    response = await client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


@pytest.mark.asyncio
async def test_request_state_pending_to_chatting():
    """Leader opens chat — status must transition from pending to chatting."""
    # TODO: implement with seeded test data
    pass


@pytest.mark.asyncio
async def test_request_state_chatting_to_approved():
    """Leader approves — seeker added to group_members, group size incremented."""
    # TODO: implement
    pass


@pytest.mark.asyncio
async def test_seeker_cannot_approve():
    """Seeker must NOT be able to call /approve — expect 403."""
    # TODO: implement
    pass
