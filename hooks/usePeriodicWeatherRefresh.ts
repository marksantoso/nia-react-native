import { worldCities } from '@/constants/Cities';
import { QueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';

export function usePeriodicWeatherRefresh(queryClient: QueryClient) {
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                // App has come to foreground - refresh stale weather-related data
                const weatherQueryKeys = ['weather', 'air-quality', 'pollen'];

                worldCities.forEach(city => {
                    weatherQueryKeys.forEach(queryType => {
                        queryClient.refetchQueries({
                            queryKey: [queryType, city.latitude, city.longitude],
                            predicate: (query) => {
                                const timeSinceLastFetch = Date.now() - (query.state.dataUpdatedAt || 0);
                                return timeSinceLastFetch > 10 * 10 * 1000; // 10 minutes
                            }
                        });
                    });
                });
            }
            appState.current = nextAppState;
        });

        return () => subscription?.remove();
    }, [queryClient]);
}