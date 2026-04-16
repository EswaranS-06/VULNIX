const app = {
    state: {
        cves: [],
        filterSeverity: 'ALL',
        searchQuery: '',
        loading: false,
        currentView: 'dashboard', // dashboard | detail | planner | assets
        currentRoute: 'dashboard',
        selectedCVE: null,
        assets: ['Linux Core', 'Docker', 'MySQL'],
        fixedCVEs: JSON.parse(localStorage.getItem('fixedCVEs') || '[]'),
        plannerCVEs: [],
        plannerLoading: false,
        sidebarCollapsed: localStorage.getItem('sidebarCollapsed') === 'true'
    },

    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute();
        this.fetchData();
    },

    async fetchData() {
        this.state.loading = true;
        this.render();
        try {
            this.state.cves = await api.getCVEs();
        } catch (error) {
            console.error('Failed to fetch CVEs:', error);
            // In a real app, I'd show an error toast here
        } finally {
            this.state.loading = false;
            this.render();
        }
    },

    handleRoute() {
        const hash = window.location.hash || '#/';
        if (hash.startsWith('#/cve/')) {
            const id = hash.split('/cve/')[1];
            this.state.currentRoute = 'dashboard';
            this.loadDetail(id);
        } else if (hash === '#/planner') {
            this.state.currentView = 'planner';
            this.state.currentRoute = 'planner';
            this.fetchPlannerData();
            this.render();
        } else if (hash === '#/assets') {
            this.state.currentView = 'assets';
            this.state.currentRoute = 'assets';
            this.render();
        } else {
            this.state.currentView = 'dashboard';
            this.state.currentRoute = 'dashboard';
            this.state.selectedCVE = null;
            this.render();
        }
    },

    async loadDetail(id) {
        this.state.loading = true;
        this.state.currentView = 'detail';
        this.render(); // Render loading state

        try {
            this.state.selectedCVE = await api.getCVEDetail(id);
        } catch (error) {
            console.error('Failed to load detail:', error);
        } finally {
            this.state.loading = false;
            this.render();
        }
    },

    async handleSync() {
        const btn = document.getElementById('sync-btn');
        if (btn) {
            btn.innerHTML = '<span>Syncing...</span>';
            btn.disabled = true;
        }

        try {
            await api.syncCVEs();
            await this.fetchData(); // Refresh list
        } catch (error) {
            console.error('Sync failed:', error);
            alert('Sync failed.');
        } finally {
            if (btn) {
                btn.innerHTML = '<span>Sync CVEs</span>';
                btn.disabled = false;
            }
        }
    },

    handleFilterChange(severity) {
        this.state.filterSeverity = severity;
        this.render();
    },

    handleSearch(query) {
        this.state.searchQuery = query.toLowerCase();
        this.render();
    },

    toggleAsset(asset) {
        const index = this.state.assets.indexOf(asset);
        if (index > -1) {
            this.state.assets.splice(index, 1);
        } else {
            this.state.assets.push(asset);
        }
        this.render();
        // Sync with backend for the planner view
        this.fetchPlannerData();
    },

    handleToggleFix(cveId) {
        const index = this.state.fixedCVEs.indexOf(cveId);
        if (index > -1) {
            this.state.fixedCVEs.splice(index, 1);
        } else {
            this.state.fixedCVEs.push(cveId);
        }
        localStorage.setItem('fixedCVEs', JSON.stringify(this.state.fixedCVEs));
        this.render();
    },

    getPlannerCVEs() {
        if (this.state.assets.length === 0) return [];

        return this.state.cves.filter(cve => {
            const description = (cve.description || '').toLowerCase();
            const cweId = (cve.cwe_id || '').toLowerCase();

            let configs = [];
            try {
                configs = cve.configurations ? JSON.parse(cve.configurations) : [];
            } catch (e) { }

            return this.state.assets.some(asset => {
                const term = asset.split(' ')[0].toLowerCase(); // 'Linux Core' -> 'linux'
                return description.includes(term) ||
                    cweId.includes(term) ||
                    configs.some(c => c.toLowerCase().includes(term));
            });
        });
    },
    async fetchPlannerData() {
        if (this.state.assets.length === 0) {
            this.state.plannerCVEs = [];
            this.render();
            return;
        }
        this.state.plannerLoading = true;
        this.render();
        try {
            this.state.plannerCVEs = await api.getPlannerCVEs(this.state.assets);
        } catch (error) {
            console.error('Failed to fetch planner data:', error);
        } finally {
            this.state.plannerLoading = false;
            this.render();
        }
    },

    toggleSidebar() {
        this.state.sidebarCollapsed = !this.state.sidebarCollapsed;
        localStorage.setItem('sidebarCollapsed', this.state.sidebarCollapsed);
        this.render();
    },

    getFilteredCVEs() {
        const severityMap = { 'CRITICAL': 4, 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1, 'ALL': 0 };
        const threshold = severityMap[this.state.filterSeverity] || 0;

        return this.state.cves.filter(cve => {
            const cveSeverity = severityMap[cve.severity] || 0;
            const matchesSeverity = threshold === 0 || cveSeverity >= threshold;

            const search = this.state.searchQuery.toLowerCase();
            const matchesSearch =
                cve.cve_id.toLowerCase().includes(search) ||
                (cve.description && cve.description.toLowerCase().includes(search)) ||
                (cve.cwe_id && cve.cwe_id.toLowerCase().includes(search));

            return matchesSeverity && matchesSearch;
        });
    },

    getStats() {
        return {
            total: this.state.cves.length,
            newCount: this.state.cves.filter(c => c.status === 'NEW').length,
            critical: this.state.cves.filter(c => c.severity === 'CRITICAL').length
        };
    },

    render() {
        const appEl = document.getElementById('app');

        let content = '';

        if (this.state.loading && !this.state.cves.length) {
            content = '<div style="text-align: center; margin-top: 4rem;">Loading Global Intelligence...</div>';
        } else if (this.state.currentView === 'detail') {
            if (!this.state.selectedCVE) {
                content = '<div style="text-align: center; margin-top: 4rem;">Loading details...</div>';
            } else {
                content = Components.CVEDetail(this.state.selectedCVE);
            }
        } else if (this.state.currentView === 'planner') {
            if (this.state.plannerLoading && !this.state.plannerCVEs.length) {
                content = '<div style="text-align: center; margin-top: 4rem;">Analyzing Asset Intelligence...</div>';
            } else {
                content = Components.SafetyPlanner(this.state.plannerCVEs, this.state.fixedCVEs);
            }
        } else if (this.state.currentView === 'assets') {
            content = Components.AssetProfile(this.state.assets);
        } else {
            // Dashboard View
            const filteredCVEs = this.getFilteredCVEs();
            const stats = this.getStats();
            content = `
                ${Components.Header()}
                ${Components.SummaryCards(stats)}
                ${Components.CVETable(filteredCVEs)}
            `;
        }

        appEl.innerHTML = `
            <div class="layout-wrapper ${this.state.sidebarCollapsed ? 'sidebar-minimized' : ''}">
                ${Components.Sidebar(this.state.currentRoute, this.state.sidebarCollapsed)}
                <main class="main-content">
                    ${content}
                </main>
            </div>
        `;
    }
};

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
