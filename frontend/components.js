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
                <td>${cve.cvss_score || 'N/A'}</td>
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

    CVEDetail: (cve) => {
        let refs = [];
        let configs = [];
        try {
            refs = cve.references ? JSON.parse(cve.references) : [];
            if (!Array.isArray(refs)) refs = [];
        } catch (e) {
            console.error("Error parsing references", e);
            refs = [];
        }

        try {
            configs = cve.configurations ? JSON.parse(cve.configurations) : [];
            if (!Array.isArray(configs)) configs = [];
        } catch (e) {
            console.error("Error parsing configurations", e);
            configs = [];
        }

        const score = cve.cvss_score || 0;
        const severityClass = (cve.severity || 'unknown').toLowerCase();

        return `
        <div class="w-full fade-in" style="max-width: 1400px; margin: 0 auto; padding-bottom: 4rem;">
            <!-- Navigation & Breadcrumbs -->
            <div class="mb-8 flex items-center justify-between">
                <a href="#/" class="btn-glass flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                    Back to Dashboard
                </a>
                <div class="text-xs font-mono text-slate-500 bg-white/50 px-3 py-1 rounded-full border border-slate-200">
                    ID: ${cve.cve_id} • RECORDED: ${new Date(cve.created_at).toLocaleDateString()}
                </div>
            </div>

            <!-- Header Section -->
            <div class="header-banner mb-8">
                <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div class="flex-1">
                        <div class="flex items-center gap-3 mb-2">
                            <span class="badge badge-${severityClass}" style="transform: scale(1.1);">${cve.severity || 'Unknown'}</span>
                            <span class="badge badge-${(cve.status || 'unknown').toLowerCase()}">${cve.status || 'Unknown'}</span>
                        </div>
                        <h1 class="cve-title-gradient">${cve.cve_id}</h1>
                    </div>
                    <div class="score-display-premium">
                        <div class="label">CVSS SCORE</div>
                        <div class="value" style="color: var(--severity-${severityClass}-text)">${score.toFixed(1)}</div>
                        <div class="meter-bg">
                            <div class="meter-fill" style="width: ${score * 10}%; background: var(--severity-${severityClass}-text)"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-12 gap-8">
                <!-- Main Content (Left) -->
                <div class="col-span-12 lg:col-span-8 flex flex-col gap-8">
                    
                    <!-- Description Section (Emphasized with a soft highlight) -->
                    <section class="premium-card description-section">
                        <div class="section-header">
                            <div class="icon-box info"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg></div>
                            <h3>Vulnerability Description</h3>
                        </div>
                        <div class="content">
                            <p class="description-text">${cve.description || 'No description available for this vulnerability.'}</p>
                        </div>
                    </section>

                    <!-- Affected Products (CPE) -->
                    <section class="premium-card cpe-section">
                        <div class="section-header">
                            <div class="icon-box stack"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/></svg></div>
                            <h3>Affected Configurations (CPE)</h3>
                        </div>
                        <div class="content">
                            <div class="cpe-grid">
                                ${configs.length > 0
                ? configs.map(c => `<div class="cpe-item"><span class="cpe-tag">${c}</span></div>`).join('')
                : '<div class="empty-state">No specific hardware or software configurations listed.</div>'}
                            </div>
                        </div>
                    </section>

                    <!-- References Section -->
                    <section class="premium-card references-section">
                        <div class="section-header">
                            <div class="icon-box link"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></div>
                            <h3>Technical References</h3>
                        </div>
                        <div class="content">
                            <div class="reference-links">
                                ${refs.length > 0
                ? refs.map(r => `
                                        <a href="${r}" target="_blank" class="ref-item">
                                            <span class="ref-url">${r}</span>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                                        </a>`).join('')
                : '<div class="empty-state">No external references found.</div>'}
                            </div>
                        </div>
                    </section>
                </div>

                <!-- Sidebar Content (Right) -->
                <div class="col-span-12 lg:col-span-4 flex flex-col gap-8">
                    
                    <!-- Metrics Section -->
                    <aside class="premium-card metrics-section">
                        <div class="section-header">
                            <div class="icon-box activity"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
                            <h3>CVSS Metrics</h3>
                        </div>
                        <div class="content">
                            <div class="metric-item mb-4">
                                <div class="metric-label">Vector String</div>
                                <div class="vector-code">${cve.vector_string || 'N/A'}</div>
                            </div>
                            <div class="metric-item">
                                <div class="metric-label">Weakness ID</div>
                                <div class="cwe-badge">${cve.cwe_id || 'NVD-CWE-noinfo'}</div>
                            </div>
                        </div>
                    </aside>

                    <!-- Timeline Section -->
                    <aside class="premium-card timeline-section">
                        <div class="section-header">
                            <div class="icon-box clock"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
                            <h3>CVE Timeline</h3>
                        </div>
                        <div class="content">
                            <div class="timeline-trail">
                                <div class="timeline-step">
                                    <div class="step-point"></div>
                                    <div class="step-info">
                                        <div class="step-label">Published</div>
                                        <div class="step-date">${new Date(cve.published_date).toLocaleString()}</div>
                                    </div>
                                </div>
                                <div class="timeline-step">
                                    <div class="step-point modified"></div>
                                    <div class="step-info">
                                        <div class="step-label">Last Modified</div>
                                        <div class="step-date">${new Date(cve.last_modified).toLocaleString()}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    <!-- Tips / Info -->
                    <div class="info-alert">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mt-1"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                        <p>This data is synchronized from the official NVD feeds. CVSS scores may be preliminary for very new entries.</p>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
};
