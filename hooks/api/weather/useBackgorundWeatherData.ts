import { weatherService } from '@/services';
import { QueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

export function useBackgroundWeatherData(queryClient: QueryClient) {

    const prefetchWeatherData = useCallback(async (latitude: number, longitude: number) => {
        // Prefetch all weather data simultaneously
        await Promise.all([
            queryClient.prefetchQuery({
                queryKey: ['weather', latitude, longitude],
                queryFn: () => weatherService.cityWeather(latitude, longitude),
                gcTime: 1000 * 60 * 60, // 1 hour
                staleTime: 1000 * 60 * 5, // 60 minutes
            }),

            queryClient.prefetchQuery({
                queryKey: ['air-quality', latitude, longitude],
                queryFn: () => weatherService.cityAirQuality(latitude, longitude),
                gcTime: 1000 * 60 * 60,
                staleTime: 1000 * 60 * 5,
            }),

            queryClient.prefetchQuery({
                queryKey: ['pollen', latitude, longitude],
                queryFn: () => weatherService.cityPollen(latitude, longitude),
                gcTime: 1000 * 60 * 60,
                staleTime: 1000 * 60 * 5,
            }),
        ]);
    }, []);

    return { prefetchWeatherData };
}