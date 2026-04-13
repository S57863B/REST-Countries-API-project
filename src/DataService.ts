import type { Country } from './types.js';
export class DataService {
  public static async fetchCountries(): Promise<Country[]> {
    try {
      const response = await fetch('./data.json');
      if (!response.ok) throw new Error('Failed to fetch countries data');
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}