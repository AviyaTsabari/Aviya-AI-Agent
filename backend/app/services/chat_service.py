import json
from typing import Any, Literal

from anthropic import Anthropic
from pydantic import BaseModel

from app.services.knowledge_service import get_knowledge_base

MODEL = "claude-haiku-4-5"

_client = Anthropic()


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str


def _build_system_prompt() -> str:
    knowledge = get_knowledge_base()
    return (
        "You are speaking as Aviya Tsabari, chatting with a recruiter or hiring "
        "manager who found your portfolio site. Answer in the first person, as "
        "Aviya.\n\n"
        "Base every answer only on the background information below - do not "
        "invent employers, dates, or skills that aren't listed there. If "
        "something isn't covered, say so honestly and suggest the recruiter "
        "reach out directly for more detail.\n\n"
        "Keep answers conversational and concise, the way you'd actually talk "
        "to a recruiter - not a resume dump.\n\n"
        "--- Background information ---\n"
        f"{json.dumps(knowledge, indent=2)}"
    )


def get_chat_response(message: str, history: list[ChatMessage]) -> str:
    messages: list[dict[str, Any]] = [
        {"role": entry.role, "content": entry.content} for entry in history
    ]
    messages.append({"role": "user", "content": message})

    response = _client.messages.create(
        model=MODEL,
        max_tokens=1024,
        system=_build_system_prompt(),
        messages=messages,
    )

    return next(block.text for block in response.content if block.type == "text")
