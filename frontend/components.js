const Components = {
    Sidebar: (currentRoute) => `
        <aside class="sidebar">
            <div class="sidebar-logo">
                <div class="logo-box">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <span class="font-bold text-lg tracking-tight">SafetyIntel Hub</span>
            </div>
            <nav class="nav-list">
                <a href="#/" class="nav-item ${currentRoute === 'dashboard' ? 'active' : ''}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                    <span>Threat Dashboard</span>
                </a>
                <a href="#/planner" class="nav-item ${currentRoute === 'planner' ? 'active' : ''}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m17 19-5 3-5-3"/><rect x="2" y="9" width="20" height="6" rx="2"/></svg>
                    <span>Safety Planner</span>
                </a>
                <a href="#/assets" class="nav-item ${currentRoute === 'assets' ? 'active' : ''}">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0 1 12 2z"/><path d="M12 6v6l4 2"/></svg>
                    <span>Asset Profile</span>
                </a>
            </nav>
            <div class="mt-auto">
                <div class="stat-premium-card border-blue" style="padding: 1rem; border-radius: 12px; margin-bottom: 0;">
                    <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">PRO PROTECTION</div>
                    <div class="text-xs font-semibold text-slate-600 leading-tight">Your safety score is currently at 84%</div>
                </div>
            </div>
        </aside>
    `,

    Header: () => `
        <header class="flex items-center justify-between mb-10 fade-in">
            <div class="flex items-center gap-4">
                <div>
                    <h1 class="font-bold text-2xl tracking-tight text-slate-900">Intelligence Feed</h1>
                    <p class="text-xs text-slate-500 font-medium uppercase tracking-widest">Real-time threat monitoring</p>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <div class="text-right hidden md:block">
                    <div class="text-xs font-semibold text-slate-400 uppercase tracking-tighter">System Status</div>
                    <div class="flex items-center gap-1.5 justify-end mt-0.5">
                        <span class="status-dot"></span>
                        <span class="text-xs font-bold text-slate-700">All Systems Operational</span>
                    </div>
                </div>
                <button onclick="app.handleSync()" class="btn-premium pulse" id="sync-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9V3"/><path d="M16 12l5-5-5-5"/></svg>
                    <span>Sync Intelligence</span>
                </button>
            </div>
        </header>
    `,

    SummaryCards: ({ total, newCount, critical }) => `
        <div class="dashboard-stats-grid mb-10 fade-in">
            <div class="stat-premium-card border-blue">
                <div class="flex justify-between items-start mb-4">
                    <div class="icon bg-blue-50 text-blue-600"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></div>
                    <span class="badge badge-blue">Global Feed</span>
                </div>
                <div class="value">${total}</div>
                <div class="label">Total Intelligence Records</div>
                <p class="desc">Actively tracking vulnerabilities from NVD</p>
            </div>
            <div class="stat-premium-card border-purple">
                <div class="flex justify-between items-start mb-4">
                    <div class="icon bg-purple-50 text-purple-600"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg></div>
                    <span class="badge badge-purple">Emerging Threats</span>
                </div>
                <div class="value">${newCount}</div>
                <div class="label">New Threats Today</div>
                <p class="desc">Potential zero-day and emerging hazards</p>
            </div>
            <div class="stat-premium-card border-red">
                <div class="flex justify-between items-start mb-4">
                    <div class="icon bg-red-50 text-red-600"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg></div>
                    <span class="badge badge-red pulse-slow">Action Required</span>
                </div>
                <div class="value">${critical}</div>
                <div class="label">Critical Risks</div>
                <p class="desc">High-severity vulnerabilities impacting safety</p>
            </div>
        </div>
    `,

    SafetyPlanner: (criticalCVEs) => `
        <div class="fade-in">
            <div class="section-title-box mb-8">
                <h2 class="text-2xl font-black text-slate-900">Safety Action Planner</h2>
                <p class="text-slate-500">Prioritized mitigation steps based on active threats in your environment.</p>
            </div>

            <div class="grid grid-cols-12 gap-6 w-full h-full" style="display: grid;">
                <div class="col-span-8">
                    <div class="premium-card mb-6">
                        <div class="section-header">
                            <div class="icon-box info"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m17 19-5 3-5-3"/><rect x="2" y="9" width="20" height="6" rx="2"/></svg></div>
                            <h3>Immediate Mitigation Queue</h3>
                        </div>
                        <div class="content">
                            ${criticalCVEs.length > 0 ? criticalCVEs.map((cve, i) => `
                                <div class="planner-item ${i === 0 ? 'priority-high' : ''}">
                                    <div class="flex items-start gap-4">
                                        <div class="check-box"></div>
                                        <div>
                                            <div class="text-sm font-bold text-slate-800">${cve.cve_id} - Patching Required</div>
                                            <p class="text-xs text-slate-500 mt-1">${cve.description.substring(0, 150)}...</p>
                                            <div class="flex gap-2 mt-3">
                                                <span class="badge badge-outline-critical">Priority: High</span>
                                                <span class="badge-blue px-2">Action: Software Update</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `).join('') : `
                                <div class="text-center p-10 text-slate-400">
                                    <p>Wonderful! No critical patches required for your monitored assets.</p>
                                </div>
                            `}
                        </div>
                    </div>

                    <div class="premium-card">
                        <div class="section-header">
                            <div class="icon-box activity"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg></div>
                            <h3>General Best Practices</h3>
                        </div>
                        <div class="content grid grid-cols-2 gap-4" style="display: grid;">
                            <div class="best-practice-card">
                                <div class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">NETWORK</div>
                                <div class="text-sm font-semibold">Enable Zero-Trust Policies</div>
                                <p class="text-xs text-slate-500 mt-1">Review your firewall rules for any unused open ports (E.g. SSH, RDP).</p>
                            </div>
                            <div class="best-practice-card">
                                <div class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">IDENTITY</div>
                                <div class="text-sm font-semibold">Rotate Administrative Credentials</div>
                                <p class="text-xs text-slate-500 mt-1">Ensure all critical services use Multi-Factor Authentication.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-span-4">
                    <div class="premium-card mb-6 border-blue" style="border-top: 5px solid #3b82f6;">
                        <div class="content text-center py-8">
                            <div class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Safety Readiness</div>
                            <div class="text-6xl font-black text-slate-900 mb-2">84%</div>
                            <p class="text-xs text-slate-500">Your organization is significantly ahead of the industry average (62%).</p>
                            <button class="btn-action w-full mt-6 justify-center">Generate Safety Report</button>
                        </div>
                    </div>

                    <div class="premium-card">
                        <div class="section-header">
                          <h3>Upcoming Deadlines</h3>
                        </div>
                        <div class="content">
                            <div class="deadline-item">
                                <div class="text-xs font-bold text-slate-800">Patch CVE-2025-69437</div>
                                <div class="text-[10px] text-red-500 font-bold mt-1">DUE IN 2 DAYS</div>
                            </div>
                            <div class="deadline-item mt-4">
                                <div class="text-xs font-bold text-slate-800">Audit External Assets</div>
                                <div class="text-[10px] text-slate-400 font-bold mt-1">DUE IN 1 WEEK</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,

    AssetProfile: (assets) => `
        <div class="fade-in">
            <div class="section-title-box mb-8">
                <h2 class="text-2xl font-black text-slate-900">Your Corporate Asset Profile</h2>
                <p class="text-slate-500">Select the technologies your company uses to receive personalized threat alerts.</p>
            </div>

            <div class="premium-card p-10">
                <div class="grid grid-cols-4 gap-6" style="display: grid;">
                    ${['Linux Core', 'Windows Server', 'Apache', 'Nginx', 'Docker', 'Kubernetes', 'MySQL', 'PostgreSQL', 'Redis', 'Python', 'Go', 'PHP', 'WordPress', 'Outlook', 'Azure', 'AWS'].map(asset => `
                        <div class="asset-toggle-box ${assets && assets.includes(asset) ? 'active' : ''}" onclick="app.toggleAsset('${asset}')">
                            <div class="asset-icon bg-slate-100">${asset[0]}</div>
                            <span class="text-sm font-bold text-slate-700">${asset}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="mt-8 flex justify-end">
                <button class="btn-premium">Save Corporate Profile</button>
            </div>
        </div>
    `,

    Filters: ({ currentSeverity }) => `
        <div class="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 fade-in">
            <div class="section-title-box">
                <h2 class="text-xl font-bold text-slate-800">Intelligence Feed</h2>
                <p class="text-sm text-slate-500">Real-time tracking of new vulnerabilities and exploits.</p>
            </div>
            <div class="flex items-center gap-3 w-full md:w-auto">
                <div class="search-premium border">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-slate-400 ml-3"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    <input type="text" 
                           class="search-input" 
                           placeholder="Search CVE ID or technology..." 
                           oninput="app.handleSearch(this.value)">
                </div>
                <div class="filter-premium border">
                    <select class="filter-select" onchange="app.handleFilterChange(this.value)">
                        <option value="ALL" ${currentSeverity === 'ALL' ? 'selected' : ''}>Risk: All Severities</option>
                        <option value="CRITICAL" ${currentSeverity === 'CRITICAL' ? 'selected' : ''}>Risk: Critical Only</option>
                        <option value="HIGH" ${currentSeverity === 'HIGH' ? 'selected' : ''}>Risk: High & Up</option>
                        <option value="MEDIUM" ${currentSeverity === 'MEDIUM' ? 'selected' : ''}>Risk: Medium & Up</option>
                    </select>
                </div>
            </div>
        </div>
    `,

    CVETable: (cves) => {
        if (!cves || cves.length === 0) {
            return `
                <div class="premium-card text-center p-20 fade-in">
                    <div class="mb-4 text-slate-300">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto;"><path d="m21 21-4.3-4.3"/><circle cx="11" cy="11" r="8"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>
                    </div>
                    <h3 class="text-xl font-semibold text-slate-600 mb-2">No matching intelligence found</h3>
                    <p class="text-slate-400 max-w-xs mx-auto">Try adjusting your filters or sync with the NVD to fetch the latest records.</p>
                </div>
            `;
        }

        const rows = cves.map(cve => {
            const severityClass = (cve.severity || 'unknown').toLowerCase();
            const score = cve.cvss_score || 0;
            const shortDesc = cve.description ? (cve.description.length > 120 ? cve.description.substring(0, 120) + '...' : cve.description) : 'No description provided';

            return `
            <tr class="table-row">
                <td class="p-4 align-middle">
                    <a href="#/cve/${cve.cve_id}" class="cve-id-link">${cve.cve_id}</a>
                    <div class="text-xs text-slate-400 mt-1 uppercase font-bold tracking-tighter">${cve.cwe_id || 'CWE-NA'}</div>
                </td>
                <td class="p-4 align-middle">
                    <div class="flex flex-col">
                        <span class="text-sm font-semibold text-slate-700 leading-tight">${shortDesc}</span>
                        <div class="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">Ref: ${cve.status || 'UNRANKED'}</div>
                    </div>
                </td>
                <td class="p-4 align-middle">
                    <div class="flex items-center gap-3">
                        <div class="small-meter-bg">
                            <div class="small-meter-fill bg-${severityClass}" style="width: ${score * 10}%"></div>
                        </div>
                        <span class="text-sm font-black text-${severityClass}-text">${score.toFixed(1)}</span>
                    </div>
                </td>
                <td class="p-4 align-middle">
                    <span class="badge badge-outline-${severityClass}">${cve.severity || 'N/A'}</span>
                </td>
                <td class="p-4 align-middle">
                    <div class="text-xs font-semibold text-slate-600">${new Date(cve.published_date).toLocaleDateString()}</div>
                </td>
                <td class="p-4 align-middle text-right">
                    <a href="#/cve/${cve.cve_id}" class="btn-action">
                        Investigate
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
                    </a>
                </td>
            </tr>
        `}).join('');

        return `
            <div class="premium-table-wrapper fade-in overflow-x-auto">
                <table class="w-full text-left table-auto">
                    <thead>
                        <tr class="border-b border-slate-100">
                            <th class="p-4 text-xs font-bold uppercase tracking-widest text-slate-400">Threat Identifier</th>
                            <th class="p-4 text-xs font-bold uppercase tracking-widest text-slate-400">Vulnerability Summary</th>
                            <th class="p-4 text-xs font-bold uppercase tracking-widest text-slate-400">Bite Intensity</th>
                            <th class="p-4 text-xs font-bold uppercase tracking-widest text-slate-400">Risk Level</th>
                            <th class="p-4 text-xs font-bold uppercase tracking-widest text-slate-400">Timestamp</th>
                            <th class="p-4 text-xs font-bold uppercase tracking-widest text-slate-400 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-50">
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
