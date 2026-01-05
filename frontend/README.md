# 🎨 Frontend – **VULNIX**

This directory contains the **frontend user interface** for the VULNIX system.
It is a **Single Page Application (SPA)** built using **Vanilla HTML, CSS, and JavaScript**.

The dashboard connects to the backend API to display, filter, and track Common Vulnerabilities and Exposures (CVEs).

---

## 🧠 Design Philosophy

The frontend was designed with the following goals:

* **Professional**: Clean, light-themed, corporate aesthetic.
* **Fast**: No heavy frameworks (React/Vue/Angular) – just pure, optimized DOM manipulation.
* **Responsive**: Works on various screen sizes.
* **Component-Based**: Modular JavaScript components for maintainability.

---

## 🧱 Technology Stack

| Component          | Technology         |
| ------------------ | ------------------ |
| Structure          | HTML5              |
| Styling            | Vanilla CSS (CSS Variables) |
| Logic              | Vanilla JavaScript (ES6+) |
| Typeface           | Inter & JetBrains Mono |
| Icons              | Minimal CSS-based |
| Routing            | Hash-based Routing |

---

## 📂 Frontend Structure

```
frontend/
├── index.html        # Main entry point (Root #app)
├── style.css         # Global styles & Light Theme variables
├── app.js            # Main application logic (State, Routing)
├── api.js            # API wrapper (Fetch logic)
├── components.js     # Functional UI Components
└── README.md         # This file
```

### File Responsibilities

* **`index.html`**: The skeleton of the app. Loads fonts and scripts.
* **`style.css`**: Defines the look and feel. Uses CSS variables for consistent colors (e.g., `--primary-color`, `--severity-critical-bg`).
* **`app.js`**: Orchestrates the app. Handles:
    * **State Management**: Tracks loaded CVEs, filters, and loading states.
    * **Routing**: Simple hash-based router (`#/cve/:id`).
    * **Rendering**: Updates the DOM based on state changes.
* **`api.js`**: Handles communication with the backend. Includes a **Mock Data** mode for testing without a backend.
* **`components.js`**: Contains reusable HTML templates for:
    * `Header` (Title + Sync Button)
    * `SummaryCards` (Statistics)
    * `Filters` (Severity dropdown + Search)
    * `CVETable` (Main data view)
    * `CVEDetail` (Drill-down view)

---

## 🚀 How to Run

### Prerequisite

Ensure the **backend** is running on `http://localhost:8000`.

### Option 1: Using Python (Simplest)

```bash
cd frontend
python3 -m http.server 3000
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Option 2: Any Static Server

You can use `live-server`, `http-server`, or just open `index.html` directly (though some browsers may block fetch requests on `file://` protocol).

---

## ✨ Features

### 1️⃣ Dashboard View
* **Summary Cards**: Instantly see Total, New, and Critical CVE counts.
* **Sync Button**: Triggers a backend sync to fetch the latest NVD data.
* **Global Search**: Filter CVEs by ID instantly.
* **Severity Filter**: Dropdown to isolate `CRITICAL`, `HIGH`, `MEDIUM`, or `LOW` vulnerabilities.
* **Live Status**: Color-coded badges for `NEW` vs `UPDATED` status.

### 2️⃣ Detailed View
* Click "View" on any CVE to see full details.
* Displays Description, CVSS Score, Published Date, and Last Modified Date.
* defensive handling for missing fields (e.g., "Unknown" severity).

---

## 🔌 API Integration

The frontend expects the following backend endpoints (defined in `api.js`):

* `POST /api/sync-cves`
* `GET /api/cves`
* `GET /api/cves/{id}`

> **Dev Note**: You can toggle `USE_MOCK_DATA` in `api.js` to `true` to test changes without a running backend.

---

### 🔗 Quick Navigation

[![Backend](https://img.shields.io/badge/Backend-README-blue)](backend/README.md) [![API](https://img.shields.io/badge/API-Documentation-green)](backend/app/README.md) [![Tests](https://img.shields.io/badge/Tests-Documentation-success)](backend/tests/README.md) [![Frontend](https://img.shields.io/badge/Frontend-Documentation-orange)](frontend/README.md)