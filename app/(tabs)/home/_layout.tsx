import { Stack } from 'expo-router';

export default function CityLayout() {
    return (
        <Stack
            screenOptions={{
                headerBackTitle: 'Back',
                presentation: 'card',
                headerShadowVisible: false,
            }}
        />
    );
}