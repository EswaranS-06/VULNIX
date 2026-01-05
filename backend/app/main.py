from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from app.database import engine
from app.models import Base
from app.api import router as api_router

load_dotenv()

app = FastAPI(
    title="NVD CVE Tracker",
    description="Tracks new and updated CVEs from NVD",
    version="1.0.0"
)

# 🔥 ADD THIS BLOCK
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins (OK for dev/demo)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

app.include_router(api_router)

@app.get("/")
def health_check():
    return {"status": "API running"}
