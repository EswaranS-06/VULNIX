# 📡 API Documentation – **VULNIX**

This document describes the REST APIs exposed by the **VULNIX** backend.
These APIs are responsible for synchronizing CVE data from the **National Vulnerability Database (NVD)**, retrieving stored vulnerabilities, and filtering them based on status and severity.

All APIs return **JSON responses** and are designed to be consumed by a frontend dashboard or other security tools.

---

## 🌐 Base URL

When running locally, the API is available at:

* **API Base:** [http://localhost:8000](http://localhost:8000)
* **Swagger UI:** [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🟢 Health Check API

### Endpoint

```
GET /
```

### Description

Checks whether the backend API service is running and reachable.

### Request

No parameters required.

### Response

```json
{
  "status": "API running"
}
```

---

## 🔄 Sync CVEs from NVD

### Endpoint

```
POST /api/sync-cves
```

### Description

Fetches recently published CVEs from the National Vulnerability Database and synchronizes them with the local database.

Each CVE is evaluated and marked as either **NEW** or **UPDATED** based on:

* Whether it already exists in the database
* Whether its metadata has changed since the last sync

### Query Parameters

| Parameter | Type    | Optional | Default | Description                       |
| --------- | ------- | -------- | ------- | --------------------------------- |
| days      | Integer | Yes      | 1       | Number of past days to fetch CVEs |
| limit     | Integer | Yes      | 20      | Maximum number of CVEs to process |

### Example Request

```
POST /api/sync-cves?days=1&limit=20
```

### Response

```json
{
  "fetched": 20,
  "new": 15,
  "updated": 3
}
```

---

## 📋 Get All CVEs

### Endpoint

```
GET /api/cves
```

### Description

Retrieves all CVEs stored in the local database.
Results are ordered by **published date (descending)**.

### Request

No parameters required.

### Response

```json
[
  {
    "cve_id": "CVE-2026-0579",
    "description": "SQL injection vulnerability in example application",
    "severity": "MEDIUM",
    "cvss_score": 6.9,
    "status": "NEW",
    "published_date": "2026-01-04T13:15:42",
    "last_modified": "2026-01-04T13:15:42"
  }
]
```

---

## 🆕 Get Newly Added CVEs

### Endpoint

```
GET /api/cves/new
```

### Description

Returns only the CVEs that are marked with status **NEW**.

This endpoint is useful for:

* Highlighting newly published vulnerabilities
* Daily monitoring dashboards

### Request

No parameters required.

### Response

An array of CVE objects with status `NEW`.

---

## 🔍 Get CVE Details

### Endpoint

```
GET /api/cves/{cve_id}
```

### Description

Retrieves detailed information for a specific CVE identified by its CVE ID.

### Path Parameter

| Parameter | Type   | Description                                 |
| --------- | ------ | ------------------------------------------- |
| cve_id    | String | Unique CVE identifier (e.g., CVE-2026-0579) |

### Example Request

```
GET /api/cves/CVE-2026-0579
```

### Response

```json
{
  "cve_id": "CVE-2026-0579",
  "description": "SQL injection vulnerability in example application",
  "severity": "MEDIUM",
  "cvss_score": 6.9,
  "status": "NEW",
  "published_date": "2026-01-04T13:15:42",
  "last_modified": "2026-01-04T13:15:42"
}
```

### Error Response (CVE Not Found)

```json
{
  "error": "CVE not found"
}
```

---

## 🚨 Filter CVEs by Severity

### Endpoint

```
GET /api/cves/severity/{level}
```

### Description

Retrieves CVEs filtered by severity level.

### Path Parameter

Accepted values:

```
LOW | MEDIUM | HIGH | CRITICAL | UNKNOWN
```

### Example Request

```
GET /api/cves/severity/CRITICAL
```

### Response

An array of CVE objects matching the requested severity.

---

## 🛡️ Data Normalization & Guarantees

The backend enforces the following consistency rules to ensure frontend stability:

* **Severity is never null**
  Possible values: `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`, `UNKNOWN`
* **CVSS score may be null** if not provided by NVD
* **All datetime values are normalized to UTC**
* **Duplicate CVEs are prevented** using CVE ID as the primary key

---

## ⚠️ Error Handling

* Network or NVD-related failures return server-side errors
* Invalid CVE IDs return meaningful error messages
* Missing or optional NVD fields are safely normalized before storage

---

## 🔗 Related Documentation

* Backend overview & setup
  👉 `backend/README.md`

* Testing documentation
  👉 `backend/tests/README.md`

* Project overview
  👉 `README.md`

### 🔗 Quick Navigation

[![Backend](https://img.shields.io/badge/Backend-README-blue)](backend/README.md) [![API](https://img.shields.io/badge/API-Documentation-green)](backend/app/README.md) [![Tests](https://img.shields.io/badge/Tests-Documentation-success)](backend/tests/README.md) [![Frontend](https://img.shields.io/badge/Frontend-Documentation-orange)](frontend/README.md)