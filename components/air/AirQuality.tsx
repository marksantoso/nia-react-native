import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/ui/Card";
import { SPACING } from "@/constants/Dimensions";
import { StyleSheet, View } from "react-native";
import { AQICard } from "./AQICard";

function PollutantCard({ pollutant }: { pollutant: any }) {
  return (
    <Card style={styles.pollutantCard}>
      <ThemedText style={styles.pollutantName}>{pollutant.name}</ThemedText>
      <ThemedText style={styles.pollutantValue}>
        {pollutant.value} {pollutant.unit}
      </ThemedText>
      <ThemedText style={styles.pollutantCode}>
        {pollutant.shortcode}
      </ThemedText>
    </Card>
  );
}

export function AirQuality({ airQuality }: { airQuality: string }) {
  if (!airQuality) return null;

  const airQualityData = JSON.parse(airQuality);

  return (
    <>
      <AQICard aqi={airQualityData.index} style={styles.aqiCard} />
      <View style={styles.pollutantsGrid}>
        {Object.values(airQualityData.pollutants).map((pollutant: any) => (
          <PollutantCard key={pollutant.shortcode} pollutant={pollutant} />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  pollutantCard: {
    width: "48%",
    padding: SPACING.md,
  },
  pollutantsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  pollutantName: {
    fontSize: 14,
    marginBottom: SPACING.xs,
  },
  pollutantValue: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: SPACING.xs,
  },
  pollutantCode: {
    fontSize: 12,
    opacity: 0.6,
  },
  indexCard: {
    padding: 16,
    marginBottom: 16,
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
  indexValue: {
    fontSize: 36,
    lineHeight: 40,
    fontWeight: "700",
    marginBottom: 4,
  },
  indexQualification: {
    fontSize: 18,
    opacity: 0.8,
    marginBottom: 4,
  },
  indexDescription: {
    fontSize: 14,
    opacity: 0.6,
  },
  aqiCard: {
    marginBottom: SPACING.md,
  },
});
