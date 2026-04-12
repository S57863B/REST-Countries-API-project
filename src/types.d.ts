export interface Country {
    name: string;
    population: number;
    region: string;
    capital: string;
    flags?: {
        svg: string;
        png: string;
    };
    alpha3Code: string;
    nativeName: string;
    subregion: string;
    topLevelDomain: string[];
    currencies?: {
        name: string;
    }[];
    languages: {
        name: string;
    }[];
    borders?: string[];
}
//# sourceMappingURL=types.d.ts.map