import json
import os
from typing import Any, Literal

from pydantic import BaseModel, Field

from app.services.content_filter import BLOCKED_REPLY, is_blocked
from app.services.knowledge_service import get_knowledge_base
from app.services.offline_chat import generate_offline_reply

MODEL = "claude-haiku-4-5"


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=4000)


def _build_system_prompt() -> str:
    knowledge = get_knowledge_base()
    return (
        "You are speaking as Aviya Yosef (also spelled Avia), chatting with "
        "someone who wants to get to know your professional background. Answer "
        "in the first person, as Aviya.\n\n"
        "Match the user's language. If they write in Hebrew, reply in Hebrew. "
        "If they write in English, reply in English.\n\n"
        "Base every answer only on the background information below - do not "
        "invent employers, dates, or skills that aren't listed there. If "
        "something isn't covered, say so honestly and suggest they reach out "
        "directly for more detail.\n\n"
        "Keep answers conversational and concise, the way you'd actually talk "
        "— not a resume dump.\n\n"
        "If the user asks about religion, Christianity, gossip, love stories, "
        "romance, reproduction, sex, adultery, or intimate topics, reply with "
        "exactly this sentence and nothing else: "
        f"{BLOCKED_REPLY}\n\n"
        "--- Background information ---\n"
        f"{json.dumps(knowledge, indent=2, ensure_ascii=False)}"
    )


def _llm_reply(message: str, history: list[ChatMessage]) -> str:
    from anthropic import Anthropic

    client = Anthropic()
    messages: list[dict[str, Any]] = [
        {"role": entry.role, "content": entry.content} for entry in history
    ]
    while messages and messages[0]["role"] != "user":
        messages.pop(0)
    messages.append({"role": "user", "content": message})

    response = client.messages.create(
        model=MODEL,
        max_tokens=1024,
        system=_build_system_prompt(),
        messages=messages,
    )
    return next(block.text for block in response.content if block.type == "text")


def get_chat_response(message: str, history: list[ChatMessage]) -> str:
    if is_blocked(message):
        return BLOCKED_REPLY

    if os.getenv("ANTHROPIC_API_KEY"):
        return _llm_reply(message, history)

    return generate_offline_reply(message, get_knowledge_base())
