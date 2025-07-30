import { ThemedText } from '@/components/ThemedText';
import { Card } from '@/components/ui/Card';
import { SPACING } from '@/constants/Dimensions';
import { StyleSheet, View } from 'react-native';

export type Pollutant = {
  confidence: number;
  found: boolean;
  name: string;
  shortcode: string;
  unit: string;
  value: number;
  index: {
    color: string;
    description: string;
    qualification: string;
    value: number;
  };
};

export type PollutantsProps = {
  pollutants: Pollutant[];
};

export function Pollutants({ pollutants }: PollutantsProps) {
  return (
    <View style={styles.typesGrid}>
      {Object.values(pollutants).map((pollutant) => (
        <Card style={styles.typeCard} key={pollutant.name}>
          <View style={[styles.indexIndicator, { backgroundColor: pollutant.index.color }]} />
          <ThemedText style={styles.typeName}>{pollutant.name}</ThemedText>
          <ThemedText style={styles.typeValue}>
            {pollutant.value} {pollutant.unit}
          </ThemedText>
          <View style={styles.metaContainer}>
            <ThemedText style={styles.shortcode}>{pollutant.shortcode}</ThemedText>
            <ThemedText style={styles.confidence}>
              Confidence: {pollutant.confidence}
            </ThemedText>
          </View>
          <ThemedText style={styles.qualification}>
            {pollutant.index.qualification}
          </ThemedText>
          <ThemedText style={styles.description}>
            {pollutant.index.description}
          </ThemedText>
        </Card>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  typesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  typeCard: {
    width: '48%',
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  indexIndicator: {
    height: 4,
    borderRadius: 2,
    marginBottom: SPACING.sm,
  },
  typeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  typeValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  shortcode: {
    fontSize: 12,
    opacity: 0.7,
  },
  confidence: {
    fontSize: 12,
    opacity: 0.7,
  },
  qualification: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: SPACING.xs,
  },
  description: {
    fontSize: 12,
    opacity: 0.7,
  },
});
