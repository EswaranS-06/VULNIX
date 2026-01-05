from fastapi import FastAPI
from app.database import engine
from app.models import Base

app = FastAPI(
    title="CVE Tracker",
    description="Phase 1: Database Layer",
    version="0.1.0"
)

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

@app.get("/")
def health_check():
    return {"status": "DB layer ready"}
