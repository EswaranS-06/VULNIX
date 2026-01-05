from datetime import datetime, UTC
"""“We normalized external datetime formats at the integration boundary to ensure database compatibility and future-proofed the project against Python and SQLAlchemy deprecations.”"""

def parse_nvd_datetime(value):
    """
    Convert NVD datetime (string or datetime) into timezone-aware datetime.
    """
    if value is None:
        return None

    if isinstance(value, datetime):
        return value

    # NVD uses ISO 8601 strings
    return datetime.fromisoformat(value.replace("Z", "")).replace(tzinfo=UTC)
