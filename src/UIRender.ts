import type { Country } from './types.js';

export class UIRenderer {
  // Main container element, where the content will be swapped between the list and detail views
  private root = document.getElementById('app-root') as HTMLElement;

  // Renders the main page: search, filter, and country grid.
  public renderHomePage(countries: Country[], onCardClick: (code: string) => void): void {
    this.root.innerHTML = `
      <section class="controls container">
        <div class="search-box">
          <input type="text" id="search-input" placeholder="Search for a country...">
        </div>
        <select id="region-filter">
          <option value="all">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </section>
      <section class="countries-grid container" id="countries-grid"></section>
    `;

    const grid = document.getElementById('countries-grid')!;
    countries.forEach(country => {
      const card = document.createElement('article');
      card.className = 'country-card';
      card.innerHTML = `
        <img src="${country.flags?.png}" alt="${country.name}">
        <div class="card-info">
          <h2>${country.name}</h2>
          <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
          <p><strong>Region:</strong> ${country.region}</p>
          <p><strong>Capital:</strong> ${country.capital || 'N/A'}</p>
        </div>
      `;
      // When a country card is clicked, call the callback with the country's code
      card.onclick = () => onCardClick(country.alpha3Code);
      grid.appendChild(card);
    });
  }

  // Renders the detail page for a specific country.
  public renderDetailPage(country: Country, allCountries: Country[], onBack: () => void, onBorderClick: (code: string) => void): void {
    const bordersHTML = country.borders?.map(code => {
      const name = allCountries.find(c => c.alpha3Code === code)?.name || code;
      return `<button class="border-btn" data-code="${code}">${name}</button>`;
    }).join('') || 'None';

    this.root.innerHTML = `
      <div class="container">
        <button id="back-btn" class="back-btn">← Back</button>
        <div class="detail-layout">
          <img src="${country.flags?.svg}" alt="${country.name}">
          <div class="detail-info">
            <h2>${country.name}</h2>
            <div class="info-columns">
              <div class="col">
                <p><strong>Native Name:</strong> ${country.nativeName}</p>
                <p><strong>Sub Region:</strong> ${country.subregion}</p>
              </div>
              <div class="col">
                <p><strong>Top Level Domain:</strong> ${country.topLevelDomain.join(', ')}</p>
                <p><strong>Languages:</strong> ${country.languages.map(l => l.name).join(', ')}</p>
              </div>
            </div>
            <div class="borders">
              <strong>Border Countries:</strong> ${bordersHTML}
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('back-btn')!.onclick = onBack;
    // Event delegation for border buttons
    this.root.querySelectorAll('.border-btn').forEach(btn => {
      btn.addEventListener('click', () => onBorderClick((btn as HTMLElement).dataset.code!));
    });
  }
}