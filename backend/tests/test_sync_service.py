from app.sync_service import sync_cves
from app.test_database import TestingSessionLocal, init_test_db

def test_sync_returns_stats():
    # Create tables in test DB
    init_test_db()

    db = TestingSessionLocal()

    stats = sync_cves(days=1, limit=3, db=db)

    assert "fetched" in stats
    assert "new" in stats
    assert "updated" in stats
    assert stats["fetched"] >= 0

    db.close()
