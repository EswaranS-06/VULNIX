from fastapi import APIRouter
from app.sync_service import sync_cves
from app.database import SessionLocal
from app.models import CVE

router = APIRouter(prefix="/api", tags=["CVEs"])


@router.post("/sync-cves")
def sync_cves_endpoint(days: int = 1, limit: int = 20):
    stats = sync_cves(days=days, limit=limit)
    return stats


@router.get("/cves")
def get_all_cves():
    db = SessionLocal()
    cves = db.query(CVE).order_by(CVE.published_date.desc()).all()
    db.close()
    return cves


@router.get("/cves/new")
def get_new_cves():
    db = SessionLocal()
    cves = db.query(CVE).filter(CVE.status == "NEW").all()
    db.close()
    return cves


@router.get("/cves/{cve_id}")
def get_cve_detail(cve_id: str):
    db = SessionLocal()
    cve = db.query(CVE).filter(CVE.cve_id == cve_id).first()
    db.close()

    if not cve:
        return {"error": "CVE not found"}

    return cve


@router.get("/cves/severity/{level}")
def get_cves_by_severity(level: str):
    db = SessionLocal()
    cves = db.query(CVE).filter(CVE.severity == level.upper()).all()
    db.close()
    return cves
