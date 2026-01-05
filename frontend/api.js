const API_BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:8000/api' : '/api';
const USE_MOCK_DATA = false; // Set to false to try real backend if available

const mockData = [
    {
        cve_id: "CVE-2026-0001",
        description: "A critical buffer overflow vulnerability in the core authentication module allows remote attackers to execute arbitrary code.",
        severity: "CRITICAL",
        cvss: 9.8,
        status: "NEW",
        published_date: "2026-01-04T12:00:00",
        last_modified_date: "2026-01-04T12:00:00"
    },
    {
        cve_id: "CVE-2026-0002",
        description: "Improper input validation in web interface leads to stored XSS.",
        severity: "HIGH",
        cvss: 7.5,
        status: "UPDATED",
        published_date: "2026-01-03T09:30:00",
        last_modified_date: "2026-01-04T10:15:00"
    },
    {
        cve_id: "CVE-2026-0003",
        description: "Information disclosure in API error messages.",
        severity: "MEDIUM",
        cvss: 5.4,
        status: "NEW",
        published_date: "2026-01-02T15:45:00",
        last_modified_date: "2026-01-02T15:45:00"
    },
    {
        cve_id: "CVE-2026-0004",
        description: "Low severity complexity issue in legacy module.",
        severity: "LOW",
        cvss: 3.1,
        status: "NEW",
        published_date: "2026-01-01T08:00:00",
        last_modified_date: "2026-01-01T08:00:00"
    }
];

const api = {
    async syncCVEs() {
        if (USE_MOCK_DATA) {
            return new Promise(resolve => setTimeout(() => resolve({ added: 2, updated: 1 }), 1000));
        }
        const response = await fetch(`${API_BASE_URL}/sync-cves`, { method: 'POST' });
        return response.json();
    },

    async getCVEs() {
        if (USE_MOCK_DATA) {
            return new Promise(resolve => setTimeout(() => resolve(mockData), 500));
        }
        const response = await fetch(`${API_BASE_URL}/cves`);
        return response.json();
    },

    async getCVEDetail(id) {
        if (USE_MOCK_DATA) {
            const cve = mockData.find(c => c.cve_id === id);
            return new Promise(resolve => setTimeout(() => resolve(cve), 300));
        }
        const response = await fetch(`${API_BASE_URL}/cves/${id}`);
        return response.json();
    }
};
