const app = {
    state: {
        cves: [],
        filterSeverity: 'ALL',
        searchQuery: '',
        loading: false,
        currentView: 'dashboard', // dashboard | detail
        selectedCVE: null
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
        const hash = window.location.hash;
        if (hash.startsWith('#/cve/')) {
            const id = hash.split('/cve/')[1];
            this.loadDetail(id);
        } else {
            this.state.currentView = 'dashboard';
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
            alert('Sync failed. Please check console.');
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

    getFilteredCVEs() {
        return this.state.cves.filter(cve => {
            const matchesSeverity = this.state.filterSeverity === 'ALL' || cve.severity === this.state.filterSeverity;
            const matchesSearch = cve.cve_id.toLowerCase().includes(this.state.searchQuery);
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

        if (this.state.loading && !this.state.cves.length) {
            appEl.innerHTML = '<div style="text-align: center; margin-top: 4rem;">Loading...</div>';
            return;
        }

        if (this.state.currentView === 'detail') {
            if (!this.state.selectedCVE) {
                appEl.innerHTML = '<div style="text-align: center; margin-top: 4rem;">Loading details...</div>';
                return;
            }
            appEl.innerHTML = Components.CVEDetail(this.state.selectedCVE);
            return;
        }

        // Dashboard View
        const filteredCVEs = this.getFilteredCVEs();
        const stats = this.getStats();

        appEl.innerHTML = `
            ${Components.Header({})}
            ${Components.SummaryCards(stats)}
            ${Components.Filters({ currentSeverity: this.state.filterSeverity })}
            ${Components.CVETable(filteredCVEs)}
        `;
    }
};

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
