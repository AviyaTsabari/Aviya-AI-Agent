from typing import Any

from fastapi import APIRouter, HTTPException

from app.services.knowledge_service import (
    get_experience,
    get_knowledge_base,
    get_profile,
    get_projects,
    get_skills,
)

router = APIRouter(
    prefix="/api",
    tags=["Knowledge Base"],
)


@router.get("/profile")
def read_profile() -> dict[str, Any]:
    return get_profile()


@router.get("/skills")
def read_skills() -> dict[str, Any]:
    return get_skills()


@router.get("/projects")
def read_projects() -> dict[str, Any]:
    return get_projects()


@router.get("/experience")
def read_experience() -> dict[str, Any]:
    return get_experience()


@router.get("/knowledge")
def read_knowledge_base() -> dict[str, Any]:
    return get_knowledge_base()