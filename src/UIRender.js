export class UIRenderer {
    // Main container element, where the content will be swapped between the list and detail views
    root = document.getElementById('app-root');
    // Renders the main page: search, filter, and country grid.
    renderHomePageLayout() {
        // Check if the layout already exists to avoid re-rendering it on search
        if (document.getElementById('countries-grid'))
            return;
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
    } // end renderHomePageLayout
    // Render only the cards inside the ready grid
    renderCountriesList(countries, onCardClick) {
        const grid = document.getElementById('countries-grid');
        if (!grid)
            return;
        grid.innerHTML = ''; //Clear only the grid, inputs remain in place
        countries.forEach(country => {
            const card = document.createElement('article');
            card.className = 'country-card';
            card.innerHTML = `
      <img src="${country.flags?.png}" alt="Flag of ${country.name}">
      <div class="card-info">
        <h2>${country.name}</h2>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Capital:</strong> ${country.capital || 'N/A'}</p>
      </div>
    `;
            card.onclick = () => onCardClick(country.alpha3Code);
            grid.appendChild(card);
        });
    }
    // Renders the detail page for a specific country.
    renderDetailPage(country, allCountries, onBack, onBorderClick) {
        const bordersHTML = country.borders?.map(code => {
            const name = allCountries.find(c => c.alpha3Code === code)?.name || code;
            return `<button class="border-btn" data-code="${code}">${name}</button>`;
        }).join('') || 'None';
        this.root.innerHTML = `
      <div class="container">
        <button id="back-btn" class="back-btn">← Back</button>
        <div class="detail-layout">
          <div class="detail-flag">
            <img src="${country.flags?.svg}" alt="${country.name}">
          </div>
          <div class="detail-info">
            <h2>${country.name}</h2>
            <div class="info-columns">
              <div class="col">
                <p><strong>Native Name:</strong> ${country.nativeName}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Sub Region:</strong> ${country.subregion}</p>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Capital:</strong> ${country.capital || 'N/A'}</p>
              </div>
              <div class="col">
                <p><strong>Top Level Domain:</strong> ${country.topLevelDomain.join(', ')}</p>
                <p><strong>Currencies:</strong> ${country.currencies?.map(c => c.name).join(', ') || 'N/A'}</p>
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
        document.getElementById('back-btn').onclick = onBack;
        // Event delegation for border buttons
        this.root.querySelectorAll('.border-btn').forEach(btn => {
            btn.addEventListener('click', () => onBorderClick(btn.dataset.code));
        });
    }
}
//# sourceMappingURL=UIRender.js.map