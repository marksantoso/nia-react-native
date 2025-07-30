import { ThemedText } from '@/components/ThemedText';
import { Card } from '@/components/ui/Card';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type PollenIndex = {
  color: string;
  value: number | string;
  qualification: string;
  description: string;
};

export function PollenCard({ pollen, onPress, style }: { pollen: PollenIndex, onPress?: () => void, style?: StyleProp<ViewStyle> }) {
  if (!pollen) return null;

  return (
    <Card style={[styles.card, style]} onPress={onPress}>
      <View style={[styles.indexIndicator, { backgroundColor: pollen.color }]} />
      <ThemedText style={styles.indexTitle}>Pollen</ThemedText>
      <ThemedText style={styles.indexValue}>{pollen.value}</ThemedText>
      <ThemedText style={styles.indexQualification}>{pollen.qualification}</ThemedText>
      <ThemedText style={styles.indexDescription}>{pollen.description}</ThemedText>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
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
  },
});
