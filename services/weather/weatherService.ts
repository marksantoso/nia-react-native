interface IApiClient {
    delete(url: string): Promise<any>;
    post(url: string, data: any): Promise<any>;
    get(url: string): Promise<any>;
}

export class WeatherService {
    constructor(private apiClient: IApiClient) {}

    cityWeather(latitude: number, longitude: number) {
        return this.apiClient.get(`/weather/current?lat=${latitude}&lng=${longitude}&index_type=meersens&health_recommendations=true`);
    }

    cityAirQuality(latitude: number, longitude: number) {
        return this.apiClient.get(`/air/current?lat=${latitude}&lng=${longitude}&index_type=meersens&health_recommendations=true`);
    }

    cityPollen(latitude: number, longitude: number) {
        return this.apiClient.get(`/pollen/current?lat=${latitude}&lng=${longitude}&index_type=meersens&health_recommendations=true`);
    }
}