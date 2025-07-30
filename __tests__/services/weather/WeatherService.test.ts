import { WeatherService } from '@/services/weather/weatherService';

describe('WeatherService', () => {
  let weatherService: WeatherService;
  let mockApiClient: {
    get: jest.Mock;
    post: jest.Mock;
    delete: jest.Mock;
  };

  beforeEach(() => {
    mockApiClient = {
      get: jest.fn(),
      post: jest.fn(),
      delete: jest.fn(),
    };
    weatherService = new WeatherService(mockApiClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('cityWeather', () => {
    it('should fetch current weather data for given coordinates', async () => {
      const mockWeatherData = {
        temperature: 25,
        humidity: 60,
        condition: 'sunny',
        index: 'good',
        health_recommendations: ['Enjoy outdoor activities'],
      };

      mockApiClient.get.mockResolvedValue(mockWeatherData);

      const result = await weatherService.cityWeather(40.7128, -74.006);

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/weather/current?lat=40.7128&lng=-74.006&index_type=meersens&health_recommendations=true'
      );
      expect(result).toEqual(mockWeatherData);
    });

    it('should handle API errors when fetching weather data', async () => {
      const mockError = new Error('API Error: Weather service unavailable');
      mockApiClient.get.mockRejectedValue(mockError);

      await expect(weatherService.cityWeather(40.7128, -74.006))
        .rejects.toThrow('API Error: Weather service unavailable');

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/weather/current?lat=40.7128&lng=-74.006&index_type=meersens&health_recommendations=true'
      );
    });

    it('should handle edge case coordinates (negative values)', async () => {
      const mockWeatherData = { temperature: -10, condition: 'snow' };
      mockApiClient.get.mockResolvedValue(mockWeatherData);

      const result = await weatherService.cityWeather(-33.8688, 151.2093); // Sydney

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/weather/current?lat=-33.8688&lng=151.2093&index_type=meersens&health_recommendations=true'
      );
      expect(result).toEqual(mockWeatherData);
    });
  });

  describe('cityAirQuality', () => {
    it('should fetch current air quality data for given coordinates', async () => {
      const mockAirQualityData = {
        aqi: 45,
        pollutants: {
          pm25: 12,
          pm10: 20,
          o3: 80,
        },
        index: 'good',
        health_recommendations: ['Air quality is good for outdoor activities'],
      };

      mockApiClient.get.mockResolvedValue(mockAirQualityData);

      const result = await weatherService.cityAirQuality(51.5074, -0.1278); // London

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/air/current?lat=51.5074&lng=-0.1278&index_type=meersens&health_recommendations=true'
      );
      expect(result).toEqual(mockAirQualityData);
    });

    it('should handle API errors when fetching air quality data', async () => {
      const mockError = new Error('API Error: Air quality service unavailable');
      mockApiClient.get.mockRejectedValue(mockError);

      await expect(weatherService.cityAirQuality(51.5074, -0.1278))
        .rejects.toThrow('API Error: Air quality service unavailable');
    });
  });

  describe('cityPollen', () => {
    it('should fetch current pollen data for given coordinates', async () => {
      const mockPollenData = {
        total_pollen: 'medium',
        types: {
          tree: 'high',
          grass: 'low',
          weed: 'medium',
        },
        index: 'moderate',
        health_recommendations: ['Consider limiting outdoor activities if sensitive'],
      };

      mockApiClient.get.mockResolvedValue(mockPollenData);

      const result = await weatherService.cityPollen(48.8566, 2.3522); // Paris

      expect(mockApiClient.get).toHaveBeenCalledWith(
        '/pollen/current?lat=48.8566&lng=2.3522&index_type=meersens&health_recommendations=true'
      );
      expect(result).toEqual(mockPollenData);
    });

    it('should handle API errors when fetching pollen data', async () => {
      const mockError = new Error('API Error: Pollen service unavailable');
      mockApiClient.get.mockRejectedValue(mockError);

      await expect(weatherService.cityPollen(48.8566, 2.3522))
        .rejects.toThrow('API Error: Pollen service unavailable');
    });
  });
}); 