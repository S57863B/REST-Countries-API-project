import { DataService } from './DataService.js';
import { UIRenderer } from './UIRender.js';
import type { Country } from './types.js';

class App {
  private ui = new UIRenderer();
  private allCountries: Country[] = [];

  constructor() {
    this.init();
    this.initTheme();
  }

  private async init() {
    // 1. Reciving data
    this.allCountries = await DataService.fetchCountries();
    // 2. Rendering home page with all countries
    this.showHomePage(this.allCountries);
  }

  private showHomePage(countries: Country[]) {
    this.ui.renderHomePage(countries, (code) => this.showDetailPage(code));
    this.setupSearchAndFilter();
  }

  private showDetailPage(code: string) {
    const country = this.allCountries.find(c => c.alpha3Code === code);
    if (country) {
      this.ui.renderDetailPage(
        country, 
        this.allCountries, 
        () => this.showHomePage(this.allCountries), // Back button
        (newCode) => this.showDetailPage(newCode)     // Click on border
      );
    }
  }

  private setupSearchAndFilter() {
    const input = document.getElementById('search-input') as HTMLInputElement;
    const filter = document.getElementById('region-filter') as HTMLSelectElement;

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

  private initTheme() {
    const btn = document.getElementById('theme-toggle');
    btn?.addEventListener('click', () => {
      const current = document.body.getAttribute('data-theme');
      document.body.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
    });
  }
}

// Initialize the app
new App();