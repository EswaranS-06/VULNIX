from app.database import SessionLocal
from app.nvd_fetcher import fetch_recent_cves
from app.crud import get_cve_by_id, create_cve, update_cve

def sync_cves(days=1, limit=20, db=None):
    close_db = False

    if db is None:
        db = SessionLocal()
        close_db = True

    fetched = fetch_recent_cves(days=days, limit=limit)

    stats = {
        "fetched": len(fetched),
        "new": 0,
        "updated": 0
    }

    for cve in fetched:
        db_cve = get_cve_by_id(db, cve["cve_id"])

        if not db_cve:
            cve["status"] = "NEW"
            create_cve(db, cve)
            stats["new"] += 1

        elif db_cve.last_modified != cve["last_modified"]:
            cve["status"] = "UPDATED"
            update_cve(db, db_cve, cve)
            stats["updated"] += 1

    if close_db:
        db.close()

    return stats
