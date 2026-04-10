import type { Country } from './types.js';
export class DataService {
  public static async fetchCountries(): Promise<Country[]> {
    try {
      const response = await fetch('./data.json');
      if (!response.ok) throw new Error('Ошибка при загрузке данных');
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}