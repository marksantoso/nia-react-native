import { queryClient } from "@/app/_layout";
import { City } from "@/constants/Cities";
import { SPACING } from "@/constants/Dimensions";
import { useBackgroundWeatherData } from "@/hooks/api/weather/useBackgorundWeatherData";
import { useWeather } from "@/hooks/api/weather/useWeather";
import { useCitiesStore } from "@/stores/useCitiesStore";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect } from "react";
import {
  Dimensions,
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Card } from "../ui/Card";

interface CityCardProps {
  city: City;
}

export function CityCard({ city }: CityCardProps) {
  const { updateCity, selectCity } = useCitiesStore();
  const { prefetchWeatherData } = useBackgroundWeatherData(queryClient);
  const screenWidth = Dimensions.get("window").width;
  const itemWidth = (screenWidth - SPACING.md * 3) / 2;

  // Get weather data using React Query
  const {
    data: weatherData,
    isLoading: isWeatherLoading,
    error: weatherError,
  } = useWeather({
    latitude: city.latitude,
    longitude: city.longitude,
    refetchInterval: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (weatherData) {
      updateCity(city.id, "temperature", weatherData.index.value);
      updateCity(city.id, "humidity", weatherData.parameters.humidity.value);
      updateCity(
        city.id,
        "precipitation",
        weatherData.parameters.precipitations.value,
      );
    }
  }, [weatherData, city.id, updateCity]);

  useEffect(() => {
    prefetchWeatherData(city.latitude, city.longitude);
  }, []);

  // Dynamic styles inside if needed
  const dynamicStyles = {
    width: itemWidth,
  };

  const handleCitySelect = async (cityId: string) => {
    selectCity(cityId);
    router.push(`/(tabs)/home/city`);
  };

  if (isWeatherLoading || weatherError || !weatherData) {
    return null;
  }

  return (
    <Card
      onPress={() => handleCitySelect(city.id)}
      style={[styles.cityCard, dynamicStyles]}
    >
      <ImageBackground
        source={city?.imageUrl as ImageSourcePropType}
        style={styles.cityImage}
        resizeMode="cover"
      >
        <View style={styles.temperatureContainer}>
          {weatherData.parameters.ww?.icon ? (
            <Image
              source={{ uri: weatherData.parameters.ww.icon }}
              style={styles.temperatureIcon}
            />
          ) : null}
          <Text style={styles.temperatureText}>
            {weatherData?.parameters?.temperature.value.toFixed(1)}
            {weatherData?.parameters?.temperature?.unit}
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.cityInfo}>
        <View style={styles.countryContainer}>
          <Text style={styles.cityName} numberOfLines={1}>
            {city.name}
          </Text>
        </View>
        <View style={styles.weatherMetricsContainer}>
          <View style={styles.weatherContainer}>
            <Ionicons name="water-outline" size={15} color="black" />
            <Text style={styles.weatherText}>
              {weatherData.parameters?.humidity?.value.toFixed(1)}
              {weatherData?.parameters?.humidity?.unit}
            </Text>
          </View>
          <View style={styles.weatherContainer}>
            <Ionicons name="rainy-outline" size={15} color="black" />
            <Text style={styles.weatherText}>
              {weatherData.parameters.precipitations.value.toFixed(1)}
              {weatherData?.parameters?.precipitations?.unit}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  cityCard: {
    padding: 0,
    borderRadius: 8,
    overflow: "hidden",
  },
  cityImage: {
    justifyContent: "flex-end",
    width: "100%",
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cityInfo: {
    padding: SPACING.md,
    gap: SPACING.xs,
  },
  cityName: {
    fontSize: 16,
    fontWeight: "600",
  },
  coordinates: {
    marginTop: SPACING.sm,
  },
  coordinateText: {
    fontSize: 12,
    opacity: 0.5,
  },
  weatherText: {
    fontSize: 10,
    opacity: 1,
  },
  countryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  weatherContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  weatherMetricsContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: SPACING.xs,
    justifyContent: "space-between",
  },
  temperatureContainer: {
    paddingHorizontal: SPACING.sm,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  temperatureText: {
    fontSize: 25,
    opacity: 1,
    color: "white",
  },
  temperatureIcon: {
    width: 25,
    height: 25,
  },
  weatherIcon: {
    width: 15,
    height: 15,
  },
});
