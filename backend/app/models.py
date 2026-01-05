from sqlalchemy import Column, String, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class CVE(Base):
    __tablename__ = "cves"

    cve_id = Column(String, primary_key=True, index=True)
    description = Column(String)
    severity = Column(String)
    cvss_score = Column(Float)
    published_date = Column(DateTime)
    last_modified = Column(DateTime)
    status = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
