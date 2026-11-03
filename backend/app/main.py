import os

from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.chat import router as chat_router
from app.api.knowledge import router as knowledge_router

app = FastAPI(
    title="Aviya AI Agent API",
    description="AI-powered career agent representing Aviya Yosef.",
    version="1.0.0",
)

default_origins = "http://localhost:4200,http://127.0.0.1:4200"
origins = [origin.strip() for origin in os.environ.get("ALLOWED_ORIGINS", default_origins).split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(knowledge_router)
app.include_router(chat_router)


@app.get("/")
def read_root() -> dict[str, str]:
    return {"message": "Aviya AI Agent backend is running"}


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "healthy"}