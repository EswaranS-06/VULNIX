from app.nvd_fetcher import fetch_recent_cves

def test_fetch_returns_list():
    cves = fetch_recent_cves(days=1, limit=3)
    assert isinstance(cves, list)

def test_fetch_limit_respected():
    cves = fetch_recent_cves(days=1, limit=2)
    assert len(cves) <= 2

def test_cve_fields_exist():
    cves = fetch_recent_cves(days=1, limit=1)
    if len(cves) == 0:
        return  # valid if no CVEs today

    cve = cves[0]
    assert "cve_id" in cve
    assert "severity" in cve
    assert "published_date" in cve
