import nvdlib
from pprint import pprint

SEVERITIES = ["LOW", "MEDIUM", "HIGH", "CRITICAL"]

def inspect_cves():
    results = {}

    for sev in SEVERITIES:
        print(f"\n{'='*80}")
        print(f"Fetching 2 CVEs for severity: {sev}")
        print(f"{'='*80}")

        try:
            cves = nvdlib.searchCVE(
                cvssV3Severity=sev,
                limit=2
            )
        except Exception as e:
            print(f"Error fetching {sev}: {e}")
            continue

        results[sev] = cves

        for idx, cve in enumerate(cves, start=1):
            print(f"\n--- {sev} CVE #{idx} ---")
            print(f"CVE ID: {cve.id}")
            pprint(vars(cve))   # 🔥 THIS IS THE IMPORTANT LINE

    return results


data = inspect_cves()
