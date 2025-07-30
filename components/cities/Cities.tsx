import { City } from "@/constants/Cities";
import { SPACING } from "@/constants/Dimensions";
import { useCitiesStore } from "@/stores/useCitiesStore";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CityCard } from "./CityCard";
import { SortCities } from "./SortCities";

const numColumns = 2;
const screenWidth = Dimensions.get("window").width;
const gap = SPACING.md;
const itemWidth = (screenWidth - SPACING.md * 3) / 2; // Account for container padding and gap

export function Cities() {
  const { filteredSortedCities } = useCitiesStore();

  return (
    <SafeAreaView>
      <>
        <SortCities />
        {filteredSortedCities.length > 0 && (
          <FlatList
            data={filteredSortedCities}
            renderItem={({ item: city }: { item: City }) => (
              <CityCard city={city} />
            )}
            keyExtractor={(city) => city.id}
            numColumns={numColumns}
            columnWrapperStyle={styles.row}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={5}
            removeClippedSubviews={true}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text>No cities found</Text>
              </View>
            }
          />
        )}
      </>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 250,
  },
  dropDown: {
    marginBottom: SPACING.md,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: gap,
  },
  cityCard: {
    padding: 0,
    width: itemWidth,
    borderRadius: 8,
    overflow: "hidden",
  },
  cityImage: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cityInfo: {
    padding: SPACING.md,
    gap: SPACING.xs,
  },
  cityName: {
    fontSize: 16,
    fontWeight: "600",
  },
  countryText: {
    fontSize: 14,
    opacity: 0.7,
  },
  coordinates: {
    marginTop: SPACING.sm,
  },
  coordinateText: {
    fontSize: 12,
    opacity: 0.5,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.xl,
  },
});
