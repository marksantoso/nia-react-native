import { AirQuality } from '@/components/air/AirQuality';
import { Container } from '@/components/ui/Container';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native';

const Air = () => {
  const { airQuality, city } = useLocalSearchParams<{ airQuality: string, city: string }>();

  return (
    <Container>
      <Stack.Screen
        options={{
          headerBackTitle: "City", // iOS
          headerTitle: JSON.parse(city).name,
          headerBackButtonMenuEnabled: true,  // Android
        }}
      />
      <ScrollView>
        <AirQuality airQuality={airQuality} />
      </ScrollView>
    </Container>
  );
}

export default Air;