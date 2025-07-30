import { ThemedText } from '@/components/ThemedText';
import { Card } from '@/components/ui/Card';
import { SPACING } from '@/constants/Dimensions';
import { StyleSheet, View } from 'react-native';

type HealthRecommendationType = {
  all: string;
  cardiovascular: string;
  elderly: string;
  family: string;
  pregnancy: string;
  respiratory: string;
  sport: string;
};

export function HealthRecommendations({ recommendations }: { recommendations: HealthRecommendationType }) {
  return (
    <Card style={styles.container}>
      <ThemedText style={styles.title}>Health Recommendations</ThemedText>
      
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>General</ThemedText>
        <ThemedText style={styles.text}>{recommendations.all}</ThemedText>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>For Sports Activities</ThemedText>
        <ThemedText style={styles.text}>{recommendations.sport}</ThemedText>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>For Families</ThemedText>
        <ThemedText style={styles.text}>{recommendations.family}</ThemedText>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>For Respiratory Conditions</ThemedText>
        <ThemedText style={styles.text}>{recommendations.respiratory}</ThemedText>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  section: {
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: SPACING.xs,
  },
  text: {
    fontSize: 14,
    opacity: 0.7,
  },
}); 