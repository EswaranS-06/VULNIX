# 🛡️ **VULNIX (VNX)**

### Automated NVD CVE Tracking & Monitoring System

![Python](https://img.shields.io/badge/Python-3.12-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![SQLite](https://img.shields.io/badge/Database-SQLite-lightgrey)
![Testing](https://img.shields.io/badge/Tests-Pytest-success)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

**VULNIX** is an automated vulnerability tracking system that continuously monitors **new and updated CVEs** published in the **National Vulnerability Database (NVD)**.
It fetches vulnerability data, tracks status changes, stores results locally, and exposes structured APIs for dashboards and analysis.

---

## 🎯 Project Objective

The rapid growth of software vulnerabilities makes manual CVE tracking inefficient and error-prone.
VULNIX automates this process by:

* Fetching CVEs directly from NVD
* Tracking **NEW** and **UPDATED** vulnerabilities
* Normalizing severity and CVSS data
* Providing REST APIs for frontend dashboards
* Enabling faster security awareness and analysis

This project is suitable for:

* Security analysts
* System administrators
* Researchers
* Academic and learning purposes

---

## 🧠 Overall System Flow

```
National Vulnerability Database (NVD)
            ↓
        CVE Fetcher
            ↓
   Sync & Status Engine
            ↓
      SQLite Database
            ↓
       FastAPI APIs
            ↓
     Frontend Dashboard
```

---

## 🚀 How to Use (High-Level)

1. Set up the backend environment
2. Start the FastAPI server
3. Sync CVEs from NVD using the API
4. Access CVE data via REST APIs
5. View and filter vulnerabilities in the frontend UI

👉 **Detailed backend setup instructions are available here:**
📘 **Backend Setup Guide** → `backend/README.md`

---

## 📂 Repository Structure

```
.
├── README.md                 # Root documentation
├── backend/
│   ├── README.md             # Backend setup & flow
│   ├── app/
│   │   └── README.md         # API documentation
│   └── tests/
│       └── README.md         # Test documentation
└── frontend/
    └── README.md             # Frontend (Antigravity)
```

---

## 📘 Documentation Index

### 📚 Core Documentation

[![Backend](https://img.shields.io/badge/Backend-README-blue)](backend/README.md)
👉 **Backend Overview & Setup**
`backend/README.md`

[![API](https://img.shields.io/badge/API-Documentation-green)](backend/app/README.md)
👉 **API Reference & Endpoints**
`backend/app/README.md`

[![Tests](https://img.shields.io/badge/Tests-Documentation-success)](backend/tests/README.md)
👉 **Testing Strategy & Usage**
`backend/tests/README.md`

[![Frontend](https://img.shields.io/badge/Frontend-Antigravity-orange)](frontend/README.md)
👉 **Frontend UI & Antigravity Prompt**
`frontend/README.md`

[![Backend](https://img.shields.io/badge/Backend-README-blue)](backend/README.md) [![API](https://img.shields.io/badge/API-Documentation-green)](backend/app/README.md) [![Tests](https://img.shields.io/badge/Tests-Documentation-success)](backend/tests/README.md) [![Frontend](https://img.shields.io/badge/Frontend-Antigravity-orange)](frontend/README.md)
---

## ⚙️ Configuration Overview

The project supports environment-based configuration.

* Sensitive values (like API keys) are stored in a `.env` file
* The NVD API key is **optional**
* The backend works even without an API key (with lower rate limits)

Detailed configuration steps are documented in:
📘 `backend/README.md`

---

## 🧪 Testing & Reliability

* Backend functionality is validated using **pytest**
* Tests ensure correct CVE fetching, syncing, and storage
* A separate test database is used for isolation
* All critical logic paths are covered

👉 Full testing documentation:
🧪 `backend/tests/README.md`

---

## 🎨 Frontend Overview

The frontend is generated using **Antigravity** and consumes the backend APIs.

It provides:

* CVE dashboard
* Severity-based filtering
* CVE detail views
* Sync trigger UI

👉 Frontend documentation & prompt:
🎨 `frontend/README.md`

<!-- ---

## 👥 Team Information

**Team No:** 18

**Team Members:**

* Vignesh
* Sandhiya
* Thirumalai Rajan -->

---

## 📌 Summary

VULNIX demonstrates a complete, modular, and production-style system for CVE tracking using modern backend practices.
It combines real-world vulnerability data with clean APIs, reliable storage, and a simple UI for effective monitoring.

---

### 🔗 Quick Navigation

[![Backend](https://img.shields.io/badge/Backend-README-blue)](backend/README.md) [![API](https://img.shields.io/badge/API-Documentation-green)](backend/app/README.md) [![Tests](https://img.shields.io/badge/Tests-Documentation-success)](backend/tests/README.md) [![Frontend](https://img.shields.io/badge/Frontend-Antigravity-orange)](frontend/README.md)
