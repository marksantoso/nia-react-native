import { Cities } from '@/components/cities/Cities';
import { SPACING } from '@/constants/Dimensions';
import { Stack } from 'expo-router';
import { SafeAreaView, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.content}>
      <Stack.Screen
        options={{
          title: "Home",
        }}
      />
      <View style={styles.content}>
        <Cities />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: SPACING.md,
    marginBottom: SPACING.xxxl,
  },
});