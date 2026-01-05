import os
import nvdlib
from datetime import datetime, timedelta, UTC
from app.utils import parse_nvd_datetime

def fetch_recent_cves(days=1, limit=20):
    start_date = datetime.now(UTC) - timedelta(days=days)
    end_date = datetime.now(UTC)

    api_key = os.getenv("NVD_API_KEY")

    search_args = {
        "pubStartDate": start_date,
        "pubEndDate": end_date,
    }

    # Use API key only if present
    if api_key:
        search_args["apiKey"] = api_key

    cve_iter = nvdlib.searchCVE(**search_args)

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
