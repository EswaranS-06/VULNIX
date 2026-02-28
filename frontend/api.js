const API_BASE_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://127.0.0.1:8000/api' : '/api';
const USE_MOCK_DATA = false; // Set to false to try real backend if available

const mockData = [
    {
        cve_id: "CVE-2026-0001",
        description: "A critical buffer overflow vulnerability in the core authentication module allows remote attackers to execute arbitrary code. The vulnerability exists in the way memory is allocated for user sessions, leading to an overflow when particularly large session headers are processed.",
        severity: "CRITICAL",
        cvss_score: 9.8,
        vector_string: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H",
        cwe_id: "CWE-121",
        references: JSON.stringify(["https://nvd.nist.gov/vuln/detail/CVE-2026-0001", "https://github.com/security/advisories/GHSA-1"]),
        configurations: JSON.stringify(["cpe:2.3:a:auth-core:auth:2.1.0:*:*:*:*:*:*:*", "cpe:2.3:o:linux:linux_kernel:5.10:*:*:*:*:*:*:*"]),
        status: "NEW",
        published_date: "2026-01-04T12:00:00",
        last_modified: "2026-01-04T12:00:00",
        created_at: "2026-02-28T10:00:00"
    },
    {
        cve_id: "CVE-2026-0002",
        description: "Improper input validation in web interface leads to stored XSS. This allows an attacker to inject malicious scripts into pages viewed by other users, potentially leading to session hijacking or unauthorized actions performed on behalf of the victim.",
        severity: "HIGH",
        cvss_score: 7.5,
        vector_string: "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N",
        cwe_id: "CWE-79",
        references: JSON.stringify(["https://nvd.nist.gov/vuln/detail/CVE-2026-0002"]),
        configurations: JSON.stringify(["cpe:2.3:a:web-ui:dashboard:1.5.2:*:*:*:*:*:*:*"]),
        status: "UPDATED",
        published_date: "2026-01-03T09:30:00",
        last_modified: "2026-01-04T10:15:00",
        created_at: "2026-02-28T10:00:00"
    },
    {
        cve_id: "CVE-2026-0003",
        description: "Information disclosure in API error messages. When an invalid request is sent to the backend, the resulting error stack trace reveals internal file paths and environment configurations that could be useful to an attacker for reconnaissance.",
        severity: "MEDIUM",
        cvss_score: 5.4,
        vector_string: "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:L/I:N/A:N",
        cwe_id: "CWE-209",
        references: JSON.stringify(["https://nvd.nist.gov/vuln/detail/CVE-2026-0003"]),
        configurations: JSON.stringify(["cpe:2.3:a:api-gen:framework:0.9.1:*:*:*:*:*:*:*"]),
        status: "NEW",
        published_date: "2026-01-02T15:45:00",
        last_modified: "2026-01-02T15:45:00",
        created_at: "2026-02-28T10:00:00"
    },
    {
        cve_id: "CVE-2026-0004",
        description: "Low severity complexity issue in legacy module. A race condition exists during the initialization of the logging service, which could occasionally cause a temporary delay in log writes but does not impact system availability or data integrity.",
        severity: "LOW",
        cvss_score: 3.1,
        vector_string: "CVSS:3.1/AV:L/AC:H/PR:L/UI:N/S:U/C:N/I:N/A:L",
        cwe_id: "CWE-362",
        references: JSON.stringify(["https://nvd.nist.gov/vuln/detail/CVE-2026-0004"]),
        configurations: JSON.stringify(["cpe:2.3:a:legacy:module:4.0:*:*:*:*:*:*:*"]),
        status: "NEW",
        published_date: "2026-01-01T08:00:00",
        last_modified: "2026-01-01T08:00:00",
        created_at: "2026-02-28T10:00:00"
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
