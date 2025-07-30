import { ThemedView } from '@/components/ThemedView';
import { Spinner } from '@/components/ui/Spinner';
import { useAuthStore } from '@/stores/useAuthStore';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';

export default function SplashScreen() {
  const { init, isAuthenticated, loading } = useAuthStore();

  useEffect(() => {
    async function initializeApp() {
      try {
        await init();
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    }
    initializeApp();
  }, []);

  useEffect(() => {
    async function handleNavigation() {
      await new Promise(resolve => setTimeout(resolve, 2000));
      if (!loading) {
        if (isAuthenticated) {
          router.replace('/(tabs)/home');
        } else {
          router.replace('/(auth)/login');
        }
      }
    }
    handleNavigation();
  }, [isAuthenticated, loading]);

  return (
    <ThemedView style={styles.container}>
      <Spinner size={50} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});