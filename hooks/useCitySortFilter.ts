import {
  SORT_BY,
  SORT_ORDERS,
  SortBy,
  SortOrder,
} from "@/components/cities/types/sort.types";
import { City } from "@/constants/Cities";
import {
  filterCitiesByRange,
  getValueRange,
  sortCities,
} from "@/utils/cityUtils";
import { useEffect, useMemo, useState } from "react";

interface UseCitySortFilterProps {
  cities: City[];
  onFilteredCitiesChange: (cities: City[]) => void;
}

export const useCitySortFilter = ({
  cities,
  onFilteredCitiesChange,
}: UseCitySortFilterProps) => {
  const [sortBy, setSortBy] = useState<SortBy>(SORT_BY.name);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SORT_ORDERS[0]);
  const [filterRange, setFilterRange] = useState<[number, number]>([0, 100]);
  const [processedCities, setProcessedCities] = useState<City[]>([]);

  // When sort by changes, sort the cities
  useEffect(() => {
    const isAscending = sortOrder === SORT_ORDERS[0];
    const sorted = sortCities(cities, sortBy, isAscending);
    const filtered = filterCitiesByRange(sorted, sortBy, filterRange);
    setProcessedCities(filtered);
  }, [cities, sortBy, sortOrder, filterRange]);

  // Update sorted cities when sort field changes
  const handleSortByChange = (newSortBy: SortBy) => {
    setSortBy(newSortBy);
    // Reset filter range when sort field changes
    const newRange = getValueRange(cities, newSortBy);
    setFilterRange(newRange);
  };

  // Update filter range when slider max value changes
  const handleFilterRangeChange = (maxValue: number) => {
    setFilterRange([valueRange[0], maxValue]);
  };

  // Calculate value range for current sort field
  const valueRange = useMemo(() => {
    return getValueRange(cities, sortBy);
  }, [cities, sortBy]);

  // Final update filtered cities when they change - using useEffect for side effects
  useEffect(() => {
    onFilteredCitiesChange(processedCities);
  }, [processedCities]);

  return {
    sortBy,
    sortOrder,
    filterRange,
    valueRange,
    setSortBy: handleSortByChange,
    setSortOrder,
    setFilterRange: handleFilterRangeChange,
  };
};
