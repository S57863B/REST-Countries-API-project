import { DataService } from './DataService.js';
import { UIRenderer } from './UIRender.js';
class App {
    ui = new UIRenderer();
    allCountries = [];
    constructor() {
        this.init();
        this.initTheme();
    }
    async init() {
        // 1. Reciving data
        this.allCountries = await DataService.fetchCountries();
        // 2. Rendering home page with all countries
        this.showHomePage(this.allCountries);
    }
    showHomePage(countries) {
        this.ui.renderHomePage(countries, (code) => this.showDetailPage(code));
        this.setupSearchAndFilter();
    }
    showDetailPage(code) {
        const country = this.allCountries.find(c => c.alpha3Code === code);
        if (country) {
            this.ui.renderDetailPage(country, this.allCountries, () => this.showHomePage(this.allCountries), // Back button
            (newCode) => this.showDetailPage(newCode) // Click on border
            );
        }
    }
    setupSearchAndFilter() {
        const input = document.getElementById('search-input');
        const filter = document.getElementById('region-filter');
        const applyFilters = () => {
            const searchTerm = input.value.toLowerCase();
            const region = filter.value;
            const filtered = this.allCountries.filter(c => {
                const matchesSearch = c.name.toLowerCase().includes(searchTerm);
                const matchesRegion = region === 'all' || c.region === region;
                return matchesSearch && matchesRegion;
            });
            // Re-render the grid only if needed (but implementation is simpler to re-render the HomePage)
            this.ui.renderHomePage(filtered, (code) => this.showDetailPage(code));
        };
        input?.addEventListener('input', applyFilters);
        filter?.addEventListener('change', applyFilters);
    }
    initTheme() {
        const btn = document.getElementById('theme-toggle');
        btn?.addEventListener('click', () => {
            const current = document.body.getAttribute('data-theme');
            document.body.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
        });
    }
}
// Initialize the app
new App();
//# sourceMappingURL=app.js.map