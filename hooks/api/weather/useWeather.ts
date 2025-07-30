import { weatherService } from "@/services";
import { useQuery } from "@tanstack/react-query";

// Cache constants
const CACHE_TIME = 1000 * 60 * 60; // 1 hour
const STALE_TIME = 1000 * 60 * 5; // 5 minutes

interface ApiError extends Error {
  response?: { status: number };
}

interface UseAirQualityOptions {
  latitude: number;
  longitude: number;
  enabled?: boolean;
  refetchInterval?: number;
}

interface UsePollenOptions {
  latitude: number;
  longitude: number;
  enabled?: boolean;
  refetchInterval?: number;
}

interface UseWeatherOptions {
  latitude: number;
  longitude: number;
  enabled?: boolean;
  refetchInterval?: number;
}

export function useWeather({
  latitude,
  longitude,
  enabled = true,
  refetchInterval = 10 * 60 * 1000,
}: UseWeatherOptions) {
  return useQuery({
    queryKey: ["weather", latitude, longitude],
    queryFn: () => weatherService.cityWeather(latitude, longitude),
    enabled: !!latitude && !!longitude && enabled,
    gcTime: CACHE_TIME,
    staleTime: STALE_TIME,
    retry: (failureCount, error: ApiError) => {
      // Retry up to 3 times unless it's a 404
      if (error?.response?.status === 404) return false;
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    refetchInterval: refetchInterval,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
}

export function useAirQuality({
  latitude,
  longitude,
  enabled = true,
  refetchInterval = 10 * 2 * 1000,
}: UseAirQualityOptions) {
  return useQuery({
    queryKey: ["air-quality", latitude, longitude],
    queryFn: () => weatherService.cityAirQuality(latitude, longitude),
    enabled: !!latitude && !!longitude && enabled,
    gcTime: CACHE_TIME,
    staleTime: STALE_TIME,
    retry: (failureCount, error: ApiError) => {
      if (error?.response?.status === 404) return false;
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchInterval: refetchInterval,
  });
}

export function usePollen({
  latitude,
  longitude,
  enabled = true,
  refetchInterval = 10 * 2 * 1000,
}: UsePollenOptions) {
  return useQuery({
    queryKey: ["pollen", latitude, longitude],
    queryFn: () => weatherService.cityPollen(latitude, longitude),
    enabled: !!latitude && !!longitude && enabled,
    gcTime: CACHE_TIME,
    staleTime: STALE_TIME,
    retry: (failureCount, error: ApiError) => {
      if (error?.response?.status === 404) return false;
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchInterval: refetchInterval,
  });
}
