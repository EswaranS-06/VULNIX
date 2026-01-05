from fastapi import FastAPI
from dotenv import load_dotenv
from app.database import engine
from app.models import Base
from app.api import router as api_router

# Load .env file
load_dotenv()

app = FastAPI(
    title="NVD CVE Tracker",
    description="Tracks new and updated CVEs from NVD",
    version="1.0.0"
)

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

app.include_router(api_router)

@app.get("/")
def health_check():
    return {"status": "API running"}
