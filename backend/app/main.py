from fastapi import FastAPI

app = FastAPI(
    title="LabFlow AI API",
    version="0.1.0",
)


@app.get("/")
def read_root() -> dict[str, str]:
    return {"message": "LabFlow AI backend is running"}


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "healthy"}

