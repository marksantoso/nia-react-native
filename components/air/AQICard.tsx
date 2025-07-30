import { ThemedText } from '@/components/ThemedText';
import { Card } from '@/components/ui/Card';
import { SPACING } from '@/constants/Dimensions';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type AQIIndex = {
  color: string;
  value: number | string;
  qualification: string;
  description: string;
};

export function AQICard({ aqi, onPress, style }: { aqi: AQIIndex, onPress?: () => void, style?: StyleProp<ViewStyle> }) {
  if (!aqi) return null;
  return (
    <Card style={[styles.card, style]} onPress={onPress}>
      <View style={[styles.indexIndicator, { backgroundColor: aqi.color }]} />
      <ThemedText style={styles.indexTitle}>Air Quality</ThemedText>
      <ThemedText style={styles.indexValue}>{aqi.value}</ThemedText>
      <ThemedText style={styles.indexQualification}>{aqi.qualification}</ThemedText>
      <ThemedText style={styles.indexDescription}>{aqi.description}</ThemedText>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: SPACING.lg,
  },
  indexIndicator: {
    height: 4,
    borderRadius: 2,
    marginBottom: 8,
  },
  indexTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  indexValue: {
    lineHeight: 40,
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  indexQualification: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  indexDescription: {
    fontSize: 14,
    opacity: 0.7,
  }
});
