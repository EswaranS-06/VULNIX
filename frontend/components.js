const Components = {
    Header: ({ onSync }) => `
        <header class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-2">
                <div style="width: 32px; height: 32px; background: var(--primary-color); border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">N</div>
                <h1>NVD CVE Tracker</h1>
            </div>
            <button onclick="app.handleSync()" class="btn btn-primary" id="sync-btn">
                <span>Sync CVEs</span>
            </button>
        </header>
    `,

    SummaryCards: ({ total, newCount, critical }) => `
        <div class="flex gap-4 mb-6">
            <div class="card stat-card">
                <div class="stat-label">Total CVEs</div>
                <div class="stat-value">${total}</div>
            </div>
            <div class="card stat-card">
                <div class="stat-label">New CVEs</div>
                <div class="stat-value" style="color: var(--primary-color)">${newCount}</div>
            </div>
            <div class="card stat-card">
                <div class="stat-label">Critical CVEs</div>
                <div class="stat-value" style="color: var(--severity-critical-text)">${critical}</div>
            </div>
        </div>
    `,

    Filters: ({ currentSeverity }) => `
        <div class="flex items-center justify-between mb-4">
            <div class="flex gap-4" style="width: 100%;">
                <div style="width: 200px;">
                    <select class="input" onchange="app.handleFilterChange(this.value)">
                        <option value="ALL" ${currentSeverity === 'ALL' ? 'selected' : ''}>Severity: All</option>
                        <option value="CRITICAL" ${currentSeverity === 'CRITICAL' ? 'selected' : ''}>Critical</option>
                        <option value="HIGH" ${currentSeverity === 'HIGH' ? 'selected' : ''}>High</option>
                        <option value="MEDIUM" ${currentSeverity === 'MEDIUM' ? 'selected' : ''}>Medium</option>
                        <option value="LOW" ${currentSeverity === 'LOW' ? 'selected' : ''}>Low</option>
                    </select>
                </div>
                <div style="flex: 1;">
                    <input type="text" 
                           class="input" 
                           placeholder="Search CVE ID..." 
                           oninput="app.handleSearch(this.value)">
                </div>
            </div>
        </div>
    `,

    CVETable: (cves) => {
        if (!cves || cves.length === 0) {
            return `
                <div class="card" style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                    No CVEs found matching your criteria.
                </div>
            `;
        }

        const rows = cves.map(cve => `
            <tr>
                <td><a href="#/cve/${cve.cve_id}" class="code-font" style="color: var(--primary-color); text-decoration: none; font-weight: 500;">${cve.cve_id}</a></td>
                <td><span class="badge badge-${(cve.severity || 'unknown').toLowerCase()}">${cve.severity || 'Unknown'}</span></td>
                <td>${cve.cvss}</td>
                <td><span class="badge badge-${(cve.status || 'unknown').toLowerCase()}">${cve.status || 'Unknown'}</span></td>
                <td>${new Date(cve.published_date).toLocaleDateString()}</td>
                <td>
                    <a href="#/cve/${cve.cve_id}" class="btn btn-outline" style="padding: 0.25rem 0.75rem; font-size: 0.75rem;">View</a>
                </td>
            </tr>
        `).join('');

        return `
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>CVE ID</th>
                            <th>Severity</th>
                            <th>CVSS</th>
                            <th>Status</th>
                            <th>Published</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            </div>
        `;
    },

    CVEDetail: (cve) => `
        <div class="card" style="max-width: 800px; margin: 0 auto;">
            <div class="detail-header">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="code-font" style="margin: 0; font-size: 1.5rem;">${cve.cve_id}</h2>
                    <a href="#/" class="btn btn-outline">← Back to Dashboard</a>
                </div>
                <div class="flex gap-2">
                    <span class="badge badge-${(cve.severity || 'unknown').toLowerCase()}">${cve.severity || 'Unknown'}</span>
                    <span class="badge" style="background: #f1f5f9; color: #475569;">CVSS: ${cve.cvss}</span>
                    <span class="badge badge-${(cve.status || 'unknown').toLowerCase()}">${cve.status || 'Unknown'}</span>
                </div>
            </div>

            <div class="mb-6">
                <div class="detail-label">Description</div>
                <p class="detail-text">${cve.description}</p>
            </div>

            <div class="flex gap-6" style="border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
                <div>
                    <div class="detail-label">Published Date</div>
                    <div class="detail-text code-font" style="font-size: 0.875rem;">${new Date(cve.published_date).toLocaleString()}</div>
                </div>
                <div>
                    <div class="detail-label">Last Modified</div>
                    <div class="detail-text code-font" style="font-size: 0.875rem;">${new Date(cve.last_modified_date).toLocaleString()}</div>
                </div>
            </div>
        </div>
    `
};
