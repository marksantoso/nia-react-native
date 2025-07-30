import { ThemedText } from '@/components/ThemedText';
import { SPACING } from '@/constants/Dimensions';
import { StyleSheet } from 'react-native';
import { HealthRecommendations } from './HealthRecommendations';
import { PollenCard } from './PollenCard';
import { Pollutant, Pollutants } from './Pollutants';


type HealthRecommendationType = {
  all: string;
  cardiovascular: string;
  elderly: string;
  family: string;
  pregnancy: string;
  respiratory: string;
  sport: string;
};

type PollenIndex = {
  color: string;
  value: number | string;
  qualification: string;
  description: string;
};

type PollenType = {
  name: string;
  value: number;
  unit: string;
  risk: string;
};


type PollenData = {
  index: PollenIndex;
  types: PollenType;
  health_recommendations: HealthRecommendationType;
  pollutants: Pollutant[];
};

export function Pollen({ pollen }: { pollen: string | null }) {
  if (!pollen) return null;

  let pollenData: PollenData;
  try {
    pollenData = JSON.parse(pollen);
  } catch (e) {
    return <ThemedText>Invalid pollen data</ThemedText>;
  }

  return (
    <>
      <PollenCard pollen={pollenData.index} />
      <Pollutants pollutants={pollenData.pollutants} />
      <HealthRecommendations recommendations={pollenData.health_recommendations} />
    </>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 4,
  },
  indexValue: {
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
  typeName: {
    fontSize: 14,
    marginBottom: SPACING.xs,
  },
  typeValue: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  typeRisk: {
    fontSize: 12,
    opacity: 0.6,
  },
});
