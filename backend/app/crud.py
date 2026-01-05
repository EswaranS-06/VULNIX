from sqlalchemy.orm import Session
from app.models import CVE

def get_cve_by_id(db: Session, cve_id: str):
    return db.query(CVE).filter(CVE.cve_id == cve_id).first()

def create_cve(db: Session, cve_data: dict):
    cve = CVE(**cve_data)
    db.add(cve)
    db.commit()
    db.refresh(cve)
    return cve

def update_cve(db: Session, db_cve: CVE, new_data: dict):
    for key, value in new_data.items():
        setattr(db_cve, key, value)
    db.commit()
    db.refresh(db_cve)
    return db_cve
