import { ThemedText } from "@/components/ThemedText";
import { IWeather } from "@/services/weather/weather.model";
import { Image } from "expo-image";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Card } from "../ui/Card";

type WeatherDetailsProps = {
  weather: IWeather;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export const WeatherCard = ({
  weather,
  onPress,
  style,
}: WeatherDetailsProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card style={[styles.card, style]} onPress={onPress}>
      <View
        style={[
          styles.indexIndicator,
          { backgroundColor: weather.index.color },
        ]}
      />
      <ThemedText style={styles.indexTitle}>Weather</ThemedText>
      <ThemedText style={styles.dateText}>
        {formatDate(weather.datetime)}
      </ThemedText>
      <View style={styles.weatherMain}>
        {weather.parameters.ww?.icon ? (
          <Image
            source={{ uri: weather.parameters.ww.icon }}
            style={styles.weatherIcon}
          />
        ) : null}
        <ThemedText style={styles.indexValue}>
          {weather.parameters.temperature.value.toFixed(1)}
          {weather.parameters.temperature.unit}
        </ThemedText>
      </View>
      {weather.parameters.ww && (
        <>
          <ThemedText style={styles.indexQualification}>
            {weather.parameters.ww.qualification}
          </ThemedText>
          <ThemedText style={styles.indexDescription}>
            {weather.parameters.ww.description}
          </ThemedText>
        </>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
  },
  weatherMain: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  weatherIcon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  indexIndicator: {
    height: 4,
    borderRadius: 2,
    marginBottom: 8,
  },
  indexTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 4,
  },
  indexValue: {
    lineHeight: 40,
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 4,
  },
  indexQualification: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  indexDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
});
