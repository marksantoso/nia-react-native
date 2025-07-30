import { Container } from '@/components/ui/Container';
import { WeatherCard } from '@/components/weather/WeatherCard';
import { WeatherParameters } from '@/components/weather/WeatherParameters';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
 
const WeatherScreen = () => {
    const { weather, city } = useLocalSearchParams<{ weather: string, city: string }>();
    const weatherData = JSON.parse(weather);
        
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
                <WeatherCard weather={weatherData} style={styles.card} />
                <WeatherParameters parameters={weatherData.parameters} />
            </ScrollView>
        </Container>
    );
};

export default WeatherScreen;

const styles = StyleSheet.create({
    card: {
        marginTop: 0,
    }
});