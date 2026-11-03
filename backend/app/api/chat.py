from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field, field_validator

from app.services.chat_service import ChatMessage, get_chat_response

router = APIRouter(
    prefix="/api",
    tags=["Chat"],
)


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=4000)
    history: list[ChatMessage] = Field(default_factory=list, max_length=40)

    @field_validator("message")
    @classmethod
    def strip_message(cls, value: str) -> str:
        stripped = value.strip()
        if not stripped:
            raise ValueError("message cannot be empty")
        return stripped


class ChatResponse(BaseModel):
    reply: str


@router.post("/chat")
def chat(request: ChatRequest) -> ChatResponse:
    try:
        reply = get_chat_response(request.message, request.history)
    except Exception as exc:
        raise HTTPException(
            status_code=502, detail="Chat service is unavailable right now."
        ) from exc
    return ChatResponse(reply=reply)
