from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, String, Float, DateTime
from datetime import datetime, UTC

Base = declarative_base()

class CVE(Base):
    __tablename__ = "cves"

    cve_id = Column(String, primary_key=True, index=True)
    description = Column(String)
    severity = Column(String)
    cvss_score = Column(Float)
    vector_string = Column(String)  # Added
    cwe_id = Column(String)         # Added
    references = Column(String)     # Added (JSON string)
    configurations = Column(String) # Added (CPEs as JSON string)
    published_date = Column(DateTime)
    last_modified = Column(DateTime)
    status = Column(String)
    created_at = Column(DateTime, default=lambda: datetime.now(UTC))
