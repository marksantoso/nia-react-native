import Constants from "expo-constants";
// lib
import ApiClient from '@/lib/apiClient';
// Services
import { WeatherService } from '@/services/weather';
const apiWeatherClient = new ApiClient(`${Constants.expoConfig?.extra?.WEATHER_API_BASE_URL}`, Constants.expoConfig?.extra?.WEATHER_API_KEY);

// Export service instances
export const weatherService = new WeatherService(apiWeatherClient);