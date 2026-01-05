import nvdlib
from datetime import datetime, timedelta

def fetch_recent_cves(days=1, limit=20):
    """
    Fetch CVEs published in the last N days.
    Pure function: no DB, no FastAPI.
    """
    start_date = datetime.utcnow() - timedelta(days=days)
    end_date = datetime.utcnow()

    cve_iter = nvdlib.searchCVE(
        pubStartDate=start_date,
        pubEndDate=end_date
    )

    results = []

    for cve in cve_iter:
        results.append({
            "cve_id": cve.id,
            "description": cve.descriptions[0].value
            if cve.descriptions else "",
            "cvss_score": cve.score[1] if cve.score else None,
            "severity": cve.score[2] if cve.score else "UNKNOWN",
            "published_date": cve.published,
            "last_modified": cve.lastModified
        })

        if len(results) >= limit:
            break

    return results
