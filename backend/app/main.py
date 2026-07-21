from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="LabFlow AI API",
    version="0.1.0",
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


@app.get("/")
def read_root() -> dict[str, str]:
    return {"message": "LabFlow AI backend is running"}


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "healthy"}