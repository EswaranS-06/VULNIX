from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import Base

TEST_DATABASE_URL = "sqlite:///./test_cves.db"

engine = create_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False}
)

TestingSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

def init_test_db():
    Base.metadata.create_all(bind=engine)
