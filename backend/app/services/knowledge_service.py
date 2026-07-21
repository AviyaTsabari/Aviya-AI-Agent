import json
from functools import lru_cache
from pathlib import Path
from typing import Any

DATA_DIR = Path(__file__).resolve().parents[3] / "data"

def _load_json(filename: str) -> Any:
    with open(DATA_DIR / filename, encoding="utf-8") as f:
        return json.load(f)
    
def get_dataset(name: str) -> Any:
    return _load_json(f"{name}.json")

@lru_cache
def get_profile() -> dict[str, Any]:
    return _load_json("profile.json")


@lru_cache
def get_skills() -> dict[str, Any]:
    return _load_json("skills.json")


@lru_cache
def get_projects() -> dict[str, Any]:
    return _load_json("projects.json")


@lru_cache
def get_experience() -> dict[str, Any]:
    return _load_json("experience.json")


@lru_cache
def get_knowledge_base() -> dict[str, Any]:
    return {
        "profile": get_profile(),
        "skills": get_skills(),
        "projects": get_projects(),
        "experience": get_experience(),
    }
