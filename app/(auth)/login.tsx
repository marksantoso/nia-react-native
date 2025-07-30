import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/stores/useAuthStore';
import { Stack, router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function LoginScreen() {
	const { signIn, loading, error } = useAuthStore();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const handleLogin = async () => {
		try {
			const user = await signIn(formData.email, formData.password);
			router.replace('/(tabs)/home');
			if (user) {
				router.replace('/(tabs)/home');
			}
		} catch (err) {
			// Error is handled by the store
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.container}
		>
			<Stack.Screen
				options={{
					title: 'Sign In',
					headerBackTitle: 'Back',
					headerShadowVisible: false,
				}}
			/>

			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				<ThemedView style={styles.formContainer}>
					<ThemedText style={styles.title}>Welcome Back</ThemedText>

					{error ? <ThemedText style={styles.errorText}>{error.message}</ThemedText> : null}

					<TextInput
						style={styles.input}
						placeholder="Email"
						placeholderTextColor="#666"
						value={formData.email}
						onChangeText={(text) => setFormData({ ...formData, email: text })}
						keyboardType="email-address"
						autoCapitalize="none"
						autoComplete="email"
						editable={!loading}
					/>

					<TextInput
						style={styles.input}
						placeholder="Password"
						placeholderTextColor="#666"
						value={formData.password}
						onChangeText={(text) => setFormData({ ...formData, password: text })}
						secureTextEntry
						autoCapitalize="none"
						editable={!loading}
					/>

					<Button
						title={loading ? 'Signing in...' : 'Sign In'}
						onPress={handleLogin}
						disabled={loading}
						style={styles.button}
						variant={loading ? 'disabled' : 'primary'}
					/>

					<TouchableOpacity
						style={styles.linkButton}
						onPress={() => router.push('/register')}
						disabled={loading}
					>
						<ThemedText style={styles.linkText}>
							Don't have an account? Register
						</ThemedText>
					</TouchableOpacity>
				</ThemedView>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContent: {
		flexGrow: 1,
	},
	formContainer: {
		flex: 1,
		padding: 20,
		justifyContent: 'center',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 24,
		textAlign: 'center',
	},
	input: {
		height: 48,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		paddingHorizontal: 16,
		marginBottom: 16,
		fontSize: 16,
		backgroundColor: '#fff',
	},
	button: {
		height: 48,
		backgroundColor: '#007AFF',
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 8,
	},
	buttonDisabled: {
		opacity: 0.6,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},
	linkButton: {
		marginTop: 16,
		alignItems: 'center',
	},
	linkText: {
		fontSize: 14,
		color: '#007AFF',
	},
	errorText: {
		color: '#FF3B30',
		marginBottom: 16,
		textAlign: 'center',
	},
});