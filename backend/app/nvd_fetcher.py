import json
import nvdlib
from datetime import datetime, timedelta, UTC
from app.utils import parse_nvd_datetime

def fetch_recent_cves(days=1, limit=20):
    start_date = datetime.now(UTC) - timedelta(days=days)
    end_date = datetime.now(UTC)

    # nvdlib automatically reads NVD_API_KEY from environment
    cve_iter = nvdlib.searchCVE(
        pubStartDate=start_date,
        pubEndDate=end_date
    )

    results = []

    for cve in cve_iter:
        severity = "UNKNOWN"
        vector_string = None
        
        # Extract CVSS details
        if hasattr(cve, 'score') and cve.score and len(cve.score) >= 3 and cve.score[2]:
            severity = cve.score[2].upper()
        
        # Try to find vector string in metrics safely
        metrics = getattr(cve, 'metrics', None)
        if metrics:
            # Look for V3.1, then V3.0, then V2
            for key in ['cvssMetricV31', 'cvssMetricV30', 'cvssMetricV2']:
                metric_list = getattr(metrics, key, None)
                if metric_list and len(metric_list) > 0:
                    primary_metric = metric_list[0]
                    cvss_data = getattr(primary_metric, 'cvssData', None)
                    if cvss_data:
                        vector_string = getattr(cvss_data, 'vectorString', None)
                    if vector_string:
                        break

        # Extract CWE
        cwe_id = "NVD-CWE-noinfo"
        weaknesses = getattr(cve, 'weaknesses', [])
        if weaknesses and len(weaknesses) > 0:
            descriptions = getattr(weaknesses[0], 'description', [])
            if descriptions and len(descriptions) > 0:
                cwe_id = getattr(descriptions[0], 'value', "NVD-CWE-noinfo")

        # Extract References
        refs = []
        raw_refs = getattr(cve, 'references', [])
        for ref in raw_refs:
            url = getattr(ref, 'url', None)
            if url:
                refs.append(url)
        
        # Extract Configurations (CPEs)
        cpes = []
        configurations = getattr(cve, 'configurations', [])
        if configurations:
            for config in configurations:
                nodes = getattr(config, 'nodes', [])
                for node in nodes:
                    cpe_matches = getattr(node, 'cpeMatch', [])
                    for cpe_match in cpe_matches:
                        cpe = getattr(cpe_match, 'criteria', None)
                        if cpe and cpe not in cpes:
                            cpes.append(cpe)

        results.append({
            "cve_id": cve.id,
            "description": cve.descriptions[0].value if cve.descriptions else "",
            "cvss_score": cve.score[1] if hasattr(cve, 'score') and cve.score else None,
            "severity": severity,
            "vector_string": vector_string,
            "cwe_id": cwe_id,
            "references": json.dumps(refs),
            "configurations": json.dumps(cpes),
            "published_date": parse_nvd_datetime(cve.published),
            "last_modified": parse_nvd_datetime(cve.lastModified)
        })

        if len(results) >= limit:
            break

    return results
