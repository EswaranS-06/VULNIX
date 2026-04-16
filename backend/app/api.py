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


@router.get("/planner")
def get_planner_cves(assets: str = ""):
    db = SessionLocal()
    if not assets:
        db.close()
        return []

    from sqlalchemy import or_
    asset_list = [a.strip().split(" ")[0].lower() for a in assets.split(",") if a.strip()]

    filters = []
    for asset in asset_list:
        filters.append(CVE.description.ilike(f"%{asset}%"))
        filters.append(CVE.cwe_id.ilike(f"%{asset}%"))
        filters.append(CVE.configurations.ilike(f"%{asset}%"))

    if not filters:
        db.close()
        return []

    cves = db.query(CVE).filter(or_(*filters)).order_by(CVE.published_date.desc()).all()
    db.close()
    return cves
