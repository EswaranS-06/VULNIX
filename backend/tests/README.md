# 🧪 Backend Tests – **VULNIX**

This directory contains automated tests for the VULNIX backend.
The tests ensure that CVE fetching, synchronization logic, and database operations work correctly and consistently.

Testing is an essential part of the project to validate functionality, prevent regressions, and demonstrate backend reliability.

---

## 🎯 Purpose of Testing

The backend tests are designed to:

* Verify CVE data fetching from NVD
* Validate sync logic for NEW and UPDATED CVEs
* Ensure database operations work correctly
* Prevent duplicate CVE entries
* Catch integration and data normalization errors early

These tests help ensure that backend changes do not break existing functionality.

---

## 📂 Test Structure

```
tests/
├── test_nvd_fetcher.py
└── test_sync_service.py
```

---

## 🧪 Test Files Explained

### 1️⃣ `test_nvd_fetcher.py`

**Purpose**

* Tests the CVE fetching logic from NVD
* Ensures fetched data is in the expected format
* Validates that limits and date filters work correctly

**What it checks**

* Returned data is a list
* CVE objects contain required fields
* The number of CVEs respects the specified limit

---

### 2️⃣ `test_sync_service.py`

**Purpose**

* Tests the core synchronization logic
* Ensures CVEs are marked as NEW or UPDATED correctly
* Verifies database insert and update behavior

**What it checks**

* Sync returns correct statistics
* CVEs are stored in the database
* Duplicate CVEs are not re-inserted
* Updates are detected using `last_modified`

---

## 🗄️ Test Database Strategy

* Tests use a **separate SQLite test database**
* Production database is never touched
* Tables are created automatically during tests
* Database sessions are injected for isolation

This ensures tests are:

* Safe
* Repeatable
* Deterministic

---

## ▶️ Running the Tests

From the `backend/` directory:

```bash
pytest -v
```

---

## ✅ Expected Output

When all tests pass, the output should look similar to:

```
test_nvd_fetcher.py ..... PASSED
test_sync_service.py .... PASSED
```

Each test case will be listed along with its status.

---

## ⚠️ Common Errors & Solutions

### ❌ Database Table Not Found

**Error**

```
sqlite3.OperationalError: no such table: cves
```

**Cause**

* Test database tables were not initialized

**Solution**

* Ensure test database initialization is executed before tests

---

### ❌ Network or NVD Timeout

**Error**

```
TimeoutError or ConnectionError
```

**Cause**

* NVD service temporarily unreachable

**Solution**

* Retry after some time
* Ensure internet connectivity

---

### ❌ Severity or CVSS Field Errors

**Error**

```
AttributeError or TypeError in severity handling
```

**Cause**

* Missing or optional CVSS data from NVD

**Solution**

* Backend normalization logic ensures severity is never null

---

### ❌ Environment Variable Warnings

**Error**

```
NVD_API_KEY not set
```

**Cause**

* API key not provided

**Solution**

* API key is optional; tests still pass without it

---

## 🧠 Why These Tests Matter

* Demonstrate backend correctness
* Validate real-world edge cases from NVD data
* Improve confidence during frontend integration
* Provide clear evidence of project quality during evaluation

---

## 🔗 Related Documentation

* Backend overview & setup
  👉 `backend/README.md`

* API documentation
  👉 `backend/app/README.md`

* Project overview
  👉 `README.md`

### 🔗 Quick Navigation

[![Backend](https://img.shields.io/badge/Backend-README-blue)](backend/README.md) [![API](https://img.shields.io/badge/API-Documentation-green)](backend/app/README.md) [![Tests](https://img.shields.io/badge/Tests-Documentation-success)](backend/tests/README.md) [![Frontend](https://img.shields.io/badge/Frontend-Documentation-orange)](frontend/README.md)