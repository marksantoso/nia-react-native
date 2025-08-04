import { City } from "@/constants/Cities";
import { Colors } from "@/constants/Colors";
import { SPACING } from "@/constants/Dimensions";
import { useCitySortFilter } from "@/hooks/useCitySortFilter";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useCitiesStore } from "@/stores/useCitiesStore";
import { RadioButtonGroup, RadioButtonItem } from "expo-radio-button";
import React, { useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { DropDown } from "../ui/DropDown";
import { RangeSlider } from "./RangeSlider";
import {
  NumericSortBy,
  SORT_BY,
  SORT_ORDERS,
  SortOrder,
} from "./types/sort.types";

const SORT_OPTIONS = [
  { label: "Sort by Name", value: SORT_BY.name },
  { label: "Sort by Temperature", value: SORT_BY.temperature },
  { label: "Sort by Humidity", value: SORT_BY.humidity },
  { label: "Sort by Precipitation", value: SORT_BY.precipitation },
];

const NUMERIC_SORT_FIELDS = [
  SORT_BY.temperature,
  SORT_BY.humidity,
  SORT_BY.precipitation,
];

export function SortCities() {
  const colorScheme = useColorScheme();
  const { cities, setFilteredSortedCities } = useCitiesStore();

  const handleFilteredCitiesChange = useCallback(
    (filteredCities: City[]) => {
      setFilteredSortedCities(filteredCities);
    },
    [setFilteredSortedCities],
  );

  const {
    sortBy,
    sortOrder,
    filterRange,
    valueRange,
    setSortBy,
    setSortOrder,
    setFilterRange,
  } = useCitySortFilter({
    cities,
    onFilteredCitiesChange: handleFilteredCitiesChange,
  });

  const showRangeSlider = NUMERIC_SORT_FIELDS.includes(sortBy as NumericSortBy);

  const dynamicStyles = useMemo(() => {
    return {
      container: {
        height: sortBy === SORT_BY.name ? 110 : 160,
      },
    };
  }, [sortBy]);

  return (
    <View style={dynamicStyles.container}>
      <DropDown
        data={SORT_OPTIONS}
        onSelect={(item) => setSortBy(item.value)}
        placeholder="Sort by"
        value={sortBy}
        containerStyle={styles.dropDown}
      />
      <>
        <RadioButtonGroup
          containerStyle={styles.radioContainer}
          selected={sortOrder}
          onSelected={(value: string) => setSortOrder(value as SortOrder)}
          containerOptionStyle={styles.radioOption}
          radioBackground={Colors[colorScheme ?? "light"].primary}
        >
          <RadioButtonItem value={SORT_ORDERS[0]} label="Asc" />
          <RadioButtonItem value={SORT_ORDERS[1]} label="Desc" />
        </RadioButtonGroup>
        <View style={styles.sliderContainer}>
          {showRangeSlider && (
            <RangeSlider
              sortBy={sortBy}
              valueRange={valueRange}
              currentMax={filterRange[1]}
              onMaxValueChange={setFilterRange}
            />
          )}
        </View>
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 160,
  },
  dropDown: {
    marginBottom: SPACING.md,
  },
  radioContainer: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: -5,
  },
  radioOption: {
    margin: 5,
  },
  sliderContainer: {
    paddingHorizontal: 10,
    height: 160,
  },
});
