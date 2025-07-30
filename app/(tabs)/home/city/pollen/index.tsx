import { Pollen } from '@/components/pollen/Pollen';
import { Container } from '@/components/ui/Container';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';

const PollenScreen = () => {
    const { pollen, city } = useLocalSearchParams<{ pollen: string, city: string }>();

    return (
        <Container style={styles.container}>
            <Stack.Screen
                options={{
                    headerBackTitle: "City", // iOS
                    headerTitle: JSON.parse(city).name,
                    headerBackButtonMenuEnabled: true,  // Android
                }}
            />
            <ScrollView >
                <Pollen pollen={pollen}/>
            </ScrollView>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 100,
    }
});

export default PollenScreen;