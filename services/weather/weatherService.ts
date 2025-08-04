import { IAirQuality, IPollen, IWeather } from "./weather.model";

interface IApiClient {
  delete(url: string): Promise<any>;
  post(url: string, data: any): Promise<any>;
  get<T>(url: string): Promise<T>;
}

export class WeatherService {
  constructor(private apiClient: IApiClient) {}

  cityWeather(latitude: number, longitude: number): Promise<IWeather> {
    return this.apiClient.get<IWeather>(
      `/weather/current?lat=${latitude}&lng=${longitude}&index_type=meersens&health_recommendations=true`,
    );
  }

  cityAirQuality(latitude: number, longitude: number): Promise<IAirQuality> {
    return this.apiClient.get<IAirQuality>(
      `/air/current?lat=${latitude}&lng=${longitude}&index_type=meersens&health_recommendations=true`,
    );
  }

  cityPollen(latitude: number, longitude: number): Promise<IPollen> {
    return this.apiClient.get<IPollen>(
      `/pollen/current?lat=${latitude}&lng=${longitude}&index_type=meersens&health_recommendations=true`,
    );
  }
}
