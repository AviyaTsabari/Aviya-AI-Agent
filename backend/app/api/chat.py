from anthropic import APIError
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.chat_service import ChatMessage, get_chat_response

router = APIRouter(
    prefix="/api",
    tags=["Chat"],
)


class ChatRequest(BaseModel):
    message: str
    history: list[ChatMessage] = []


class ChatResponse(BaseModel):
    reply: str


@router.post("/chat")
def chat(request: ChatRequest) -> ChatResponse:
    try:
        reply = get_chat_response(request.message, request.history)
    except APIError as exc:
        raise HTTPException(
            status_code=502, detail="Chat service is unavailable right now."
        ) from exc
    return ChatResponse(reply=reply)
