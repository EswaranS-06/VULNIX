# ⚙️ Backend – **VULNIX**

This directory contains the **core backend system** of the VULNIX project.
The backend is responsible for fetching CVE data from the National Vulnerability Database (NVD), tracking vulnerability status changes, storing data locally, and exposing REST APIs for frontend consumption.

---

## 🧠 Backend Responsibilities

* Fetch CVEs from NVD using `nvdlib`
* Normalize and validate CVE data
* Track CVE status (`NEW`, `UPDATED`)
* Store CVE data in SQLite
* Serve REST APIs via FastAPI
* Handle configuration using environment variables
* Ensure backend reliability with automated tests

---

## 🧱 Technology Stack

| Component          | Technology         |
| ------------------ | ------------------ |
| Language           | Python 3.12        |
| API Framework      | FastAPI            |
| Database           | SQLite             |
| ORM                | SQLAlchemy         |
| CVE Source         | NVD (via `nvdlib`) |
| Configuration      | python-dotenv      |
| Testing            | pytest             |
| Dependency Manager | uv                 |

---

## 📂 Backend Structure

```
backend/
├── app/                # Application source code
│   ├── main.py         # FastAPI entry point
│   ├── api.py          # API route definitions
│   ├── models.py       # Database models
│   ├── database.py    # Database connection
│   ├── nvd_fetcher.py # NVD integration
│   ├── sync_service.py# Core sync logic
│   └── utils.py        # Utilities (datetime parsing, etc.)
├── tests/              # Automated tests
├── pyproject.toml      # Project configuration
└── README.md           # This file
```

---

## 🚀 Backend Setup

### Option 1: Setup Using `uv` (Recommended)

```bash
cd backend
uv venv
source .venv/bin/activate
uv sync
```

Create a `.env` file in the project root:

```env
NVD_API_KEY=your_nvd_api_key_here
```

> The backend works even without an API key, but rate limits are lower.

---

### Option 2: Typical Python Setup (pip + venv)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

---

## ▶️ Running the Backend

```bash
uvicorn app.main:app --reload
```

* API Base URL: [http://localhost:8000](http://localhost:8000)
* Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🔄 Backend Flow

The backend follows a layered and modular flow:

```
API Request
   ↓
Sync Service
   ↓
NVD Fetcher (nvdlib)
   ↓
Data Normalization
   ↓
SQLite Database
   ↓
JSON Response
```

---

## 🗄️ Data Model (CVE)

The core entity stored in the database is the **CVE**.

| Field          | Description                              |
| -------------- | ---------------------------------------- |
| cve_id         | Unique CVE identifier (Primary Key)      |
| description    | Vulnerability description                |
| severity       | LOW / MEDIUM / HIGH / CRITICAL / UNKNOWN |
| cvss_score     | CVSS base score                          |
| published_date | CVE published timestamp                  |
| last_modified  | Last updated timestamp                   |
| status         | NEW or UPDATED                           |
| created_at     | Local record creation time               |

---

## 🧠 How the Backend Handles CVE Data

1. CVEs are fetched from NVD using `nvdlib`
2. Missing or optional fields are normalized
3. Severity is guaranteed to never be null
4. Each CVE is checked against the database
5. Status is assigned:

   * `NEW` → CVE not present in database
   * `UPDATED` → CVE exists but metadata changed
6. Data is stored in SQLite with strict constraints

---

## 🔐 Configuration & Environment Variables

The backend uses environment variables for sensitive configuration.

Supported variables:

| Variable    | Description          |
| ----------- | -------------------- |
| NVD_API_KEY | Optional NVD API key |

Environment variables are loaded automatically at startup.

---

## 🧪 Testing

The backend includes automated tests to validate:

* NVD fetcher behavior
* Sync logic correctness
* Database isolation
* Data normalization

Run tests:

```bash
pytest -v
```

Detailed test documentation is available here:
👉 [tests/README.md](tests/README.md)

---

## 📘 API Documentation

Detailed API documentation is available here:
👉 [app/README.md](app/README.md)

---

### 🔗 Quick Navigation

[![Backend](https://img.shields.io/badge/Backend-README-blue)](backend/README.md) [![API](https://img.shields.io/badge/API-Documentation-green)](backend/app/README.md) [![Tests](https://img.shields.io/badge/Tests-Documentation-success)](backend/tests/README.md) [![Frontend](https://img.shields.io/badge/Frontend-Documentation-orange)](frontend/README.md)
