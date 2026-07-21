from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.knowledge import router as knowledge_router

app = FastAPI(
    title="Aviya AI Agent API",
    description="AI-powered career agent representing Aviya Tsabari.",
    version="1.0.0",
)

origins = [
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(knowledge_router)


@app.get("/")
def read_root() -> dict[str, str]:
    return {"message": "Aviya AI Agent backend is running"}


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "healthy"}