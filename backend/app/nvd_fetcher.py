import nvdlib
from datetime import datetime, timedelta, UTC
from app.utils import parse_nvd_datetime

def fetch_recent_cves(days=1, limit=20):
    start_date = datetime.now(UTC) - timedelta(days=days)
    end_date = datetime.now(UTC)

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
            "published_date": parse_nvd_datetime(cve.published),
            "last_modified": parse_nvd_datetime(cve.lastModified)
        })

        if len(results) >= limit:
            break

    return results
