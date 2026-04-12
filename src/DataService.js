export class DataService {
    static async fetchCountries() {
        try {
            const response = await fetch('./data.json');
            if (!response.ok)
                throw new Error('Ошибка при загрузке данных');
            return await response.json();
        }
        catch (error) {
            console.error(error);
            return [];
        }
    }
}
//# sourceMappingURL=DataService.js.map