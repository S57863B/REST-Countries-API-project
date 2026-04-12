import type { Country } from './types.js';
export declare class UIRenderer {
    private root;
    renderHomePage(countries: Country[], onCardClick: (code: string) => void): void;
    renderDetailPage(country: Country, allCountries: Country[], onBack: () => void, onBorderClick: (code: string) => void): void;
}
//# sourceMappingURL=UIRender.d.ts.map