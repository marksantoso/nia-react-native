import ErrorBoundary from '@/components/errors/ErrorBoundary';
import { useColorScheme } from '@/hooks/useColorScheme';
import { usePeriodicWeatherRefresh } from '@/hooks/usePeriodicWeatherRefresh';
import { useAuthStore } from '@/stores/useAuthStore';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// Global cache settings for background tasks
			gcTime: 1000 * 60 * 60 * 2, // 2 hours garbage collection
			staleTime: 1000 * 60 * 10,  // 10 minutes stale time
			refetchOnWindowFocus: false, // Disable automatic refetch on focus
			refetchOnMount: false,       // Disable automatic refetch on mount
			retry: 2,
			retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
			networkMode: 'online',
		},
	},
});

function RootLayoutNav() {
	const { isAuthenticated } = useAuthStore();
  
	return (
	  <Stack screenOptions={{ headerShown: false }}>
		{/* Show main app screens only when authenticated */}
		<Stack.Protected guard={isAuthenticated}>
		  <Stack.Screen name="(tabs)" />
		</Stack.Protected>
		
		{/* Show auth screens only when not authenticated */}
		<Stack.Protected guard={!isAuthenticated}>
		  <Stack.Screen name="(auth)/login" />
		  <Stack.Screen name="(auth)/register" />
		  <Stack.Screen name="(auth)/welcome" />
		  <Stack.Screen name="index" />
		</Stack.Protected>
		
		<Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
	  </Stack>
	);
  }

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	});

 	usePeriodicWeatherRefresh(queryClient);

	if (!loaded) {
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
				<ErrorBoundary>
					<RootLayoutNav />
					<StatusBar style="auto" />
				</ErrorBoundary>
			</ThemeProvider>
		</QueryClientProvider>
	);
}