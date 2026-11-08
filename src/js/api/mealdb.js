export class MealDB {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.category = data.category;
        this.area = data.area;
        this.instructions = data.instructions ?? [];
        this.thumbnail = data.thumbnail;
        this.tags = data.tags ?? [];
        this.youtube = data.youtube;
        this.ingredients = data.ingredients ?? [];
    }
}


export class MealApi{
    constructor() {
        this.baseUrl = 'https://nutriplan-api.vercel.app/api/meals';
    }

    async request(endpoint) {
        const res = await fetch(`${this.baseUrl}${endpoint}`);
        if (!res.ok) throw new Error(`Failed to fetch ${endpoint}: ${res.status}`);
        return res.json();
    }

    async filterByMeals(query = '', limit = 25) {
        const data = await this.request(`/search?q=${query}&page=1&limit=${limit}`);
        return data.results.map(meal => new MealDB(meal));
    }

    async filterByCategory(category, limit = 25) {
        const data = await this.request(`/filter?category=${category}&page=1&limit=${limit}`);
        return data.results.map(meal => new MealDB(meal));
    }

    async filterByArea(area, limit = 25) {
        const data = await this.request(`/filter?area=${area}&page=1&limit=${limit}`);
        return data.results.map(meal => new MealDB(meal));
    }

    async getById(id) {
        const data = await this.request(`/${id}`);
        return new MealDB(data.result);
    }

    async getcategories() {
        const data = await this.request(`/categories`);
        return data.results;
    }

    async getAreas() {
        const data = await this.request(`/areas`);
        return data.results.map(area => area.name);
    }

    async getRandomMeal(count = 25) {
        const data = await this.request(`/random?count=${count}`);
        return data.results.map(meal => new MealDB(meal));
    }

}


export class NutritionApi {
    constructor() {
        this.baseUrl = 'https://nutriplan-api.vercel.app/api/nutrition/analyze';
        this.apiKey = 'tq69zH6BP6LdqmBpc8cLDfc76mtpKKCLBFnfmfBB';
    }

    async analyze(meal) {
        const res = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this.apiKey,
            },
            body: JSON.stringify({
                recipeName: meal.name,
                ingredients: meal.ingredients.map(item => `${item.measure} ${item.ingredient}`),
            }),
        });
        if (!res.ok) throw new Error(`Failed to analyze nutrition: ${res.status}`);
        const data = await res.json();
        return data.data;
    }

}


export class ProductDB {
    constructor(data) {
        this.barcode = data.barcode;
        this.name = data.name;
        this.brand = data.brand;
        this.image = data.image;
        this.nutritionGrade = data.nutritionGrade ?? 'unknown';
        this.novaGroup = data.novaGroup;
        this.nutrients = data.nutrients ?? {};
    }
}


export class ProductApi {
    constructor() {
        this.baseUrl = 'https://nutriplan-api.vercel.app/api/products';
    }

    async request(endpoint) {
        const res = await fetch(`${this.baseUrl}${endpoint}`);
        if (!res.ok) throw new Error(`Failed to fetch ${endpoint}: ${res.status}`);
        return res.json();
    }

    async search(query, page = 1, limit = 24) {
        const data = await this.request(`/search?q=${query}&page=${page}&limit=${limit}`);
        return data.results.map(product => new ProductDB(product));
    }

    async getByBarcode(code) {
        const data = await this.request(`/barcode/${code}`);
        return new ProductDB(data.result);
    }

    async getCategories(page = 1, limit = 50) {
        const data = await this.request(`/categories?page=${page}&limit=${limit}`);
        return data.results;
    }

    async getDetails(barcode) {
        const res = await fetch(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json?fields=ingredients_text,allergens_tags`);
        if (!res.ok) throw new Error(`Failed to fetch product details: ${res.status}`);
        const data = await res.json();
        return {
            ingredients: data.product?.ingredients_text ?? "",
            allergens: (data.product?.allergens_tags ?? []).map(tag => tag.replace("en:", "")),
        };
    }

    async getByCategory(category, page = 1, limit = 24) {
        const data = await this.request(`/category/${category}?page=${page}&limit=${limit}`);
        return data.results.map(product => new ProductDB(product));
    }

}