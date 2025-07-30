import { AQICard } from '@/components/air/AQICard';
import { PollenCard } from '@/components/pollen/PollenCard';
import { Spinner } from '@/components/ui/Spinner';
import { WeatherCard } from '@/components/weather/WeatherCard';
import { SPACING } from '@/constants/Dimensions';
import { useAirQuality, usePollen, useWeather } from '@/hooks/api/weather/useWeather';
import { useCitiesStore } from '@/stores/useCitiesStore';
import { Image } from 'expo-image';
import { router, Stack } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

const City = () => {
  const { selectedCityId, cities } = useCitiesStore();
  const city = cities.find((city) => city.id === selectedCityId);

  const { data: airQuality, isLoading: isLoadingAirQuality } = useAirQuality({
    latitude: city?.latitude ?? 0,
    longitude: city?.longitude ?? 0,
    refetchInterval: 10 * 2 * 1000, // 2 minutes
  });

  const { data: pollen, isLoading: isLoadingPollen } = usePollen({
    latitude: city?.latitude ?? 0,
    longitude: city?.longitude ?? 0,
    refetchInterval: 10 * 2 * 1000, // 2 minutes
  });

  const { data: weather, isLoading: isLoadingWeather } = useWeather({
    latitude: city?.latitude ?? 0,
    longitude: city?.longitude ?? 0,
    refetchInterval: 10 * 2 * 1000, // 2 minutes
  });

  const renderCard = (isLoading: boolean, component: React.ReactNode) => {
    if (isLoading) {
      return (
        <View style={[styles.card, styles.loadingCard]}>
          <Spinner size={30} />
        </View>
      );
    }
    return component;
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerBackTitle: "Cities", // iOS
          title: city?.name,
          headerBackButtonMenuEnabled: true,  // Android
        }}
      />
      <ScrollView style={styles.content}>
        <Image
          source={city?.imageUrl}
          style={styles.image}
          contentFit="cover"
        />
        {/* Weather Index Card */}
        {renderCard(
          isLoadingWeather,
          weather && (
            <WeatherCard
              weather={weather}
              style={styles.card}
              onPress={() => {
                router.push({
                  pathname: `/(tabs)/home/city/weather`,
                  params: {
                    weather: JSON.stringify(weather),
                    city: JSON.stringify(city),
                  }
                });
              }}
            />
          )
        )}

        {/* Air Quality Index Card */}
        {renderCard(
          isLoadingAirQuality,
          airQuality && (
            <AQICard
              aqi={airQuality?.index}
              style={styles.card}
              onPress={() => {
                router.push({
                  pathname: `/(tabs)/home/city/air-quality`,
                  params: {
                    airQuality: JSON.stringify(airQuality),
                    city: JSON.stringify(city),
                  }
                });
              }}
            />
          )
        )}

        {/* Pollen Index Card */}
        {renderCard(
          isLoadingPollen,
          pollen && (
            <PollenCard
              pollen={pollen?.index}
              style={styles.card}
              onPress={() => {
                router.push({
                  pathname: `/(tabs)/home/city/pollen`,
                  params: {
                    pollen: JSON.stringify(pollen),
                    city: JSON.stringify(city),
                  }
                });
              }}
            />
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    elevation: 2,
    paddingBottom: 100,
  },
  content: {
    padding: SPACING.md,
  },
  card: {
    marginTop: SPACING.md,
  },
  image: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: '100%',
    height: 300,
  },
  info: {
    backgroundColor: 'white',
    padding: 12,
    gap: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  country: {
    fontSize: 14,
    opacity: 0.7,
  },
  coordinates: {
    marginTop: 6,
  },
  coordinateText: {
    fontSize: 12,
    opacity: 0.5,
  },
  indexCard: {
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  indexIndicator: {
    height: 4,
    borderRadius: 2,
    marginBottom: SPACING.sm,
  },
  indexTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  indexValue: {
    fontSize: 36,
    lineHeight: 40,
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  indexQualification: {
    fontSize: 18,
    opacity: 0.8,
    marginBottom: SPACING.xs,
  },
  indexDescription: {
    fontSize: 14,
    opacity: 0.6,
  },
  recommendationsCard: {
    padding: SPACING.md,
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  recommendation: {
    marginBottom: SPACING.md,
  },
  recommendationType: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: SPACING.xs,
  },
  recommendationText: {
    fontSize: 14,
    opacity: 0.8,
    lineHeight: 20,
  },
  pollutantsContainer: {
    marginTop: SPACING.md,
    marginBottom: SPACING.md,
  },
  pollutantsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  pollutantText: {
    fontSize: 14,
    opacity: 0.8,
  },
  recommendationsContainer: {
    marginTop: SPACING.md,
    marginBottom: SPACING.md,
  },
  familyRecommendation: {
    fontWeight: '600',
  },
  loadingCard: {
    height: 150,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default City;