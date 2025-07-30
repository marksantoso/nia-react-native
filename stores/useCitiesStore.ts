import { SORT_BY, SORT_ORDERS, SortBy, SortOrder } from '@/components/cities/types/sort.types';
import { City, worldCities } from '@/constants/Cities';
import { create } from 'zustand';

interface CitiesState {
    cities: City[];
    selectedCityId?: string | null;
    filteredSortedCities: City[];
    sortBy: SortBy;
    sortOrder: SortOrder;
    filterRange: [number, number];
    setFilteredSortedCities: (cities: City[]) => void;
    selectCity: (id: string) => void;
    setCities: (cities: City[]) => void;
    updateCity: (id: string, key: string, value: number) => void;
    setSortBy: (sortBy: SortBy) => void;
    setSortOrder: (sortOrder: SortOrder) => void;
    setFilterRange: (range: [number, number]) => void;
}

export const useCitiesStore = create<CitiesState>((set) => ({
    cities: worldCities,
    filteredSortedCities: worldCities,
    selectedCityId: null,
    sortBy: SORT_BY.name,
    sortOrder: SORT_ORDERS[0],
    filterRange: [0, 100],
    setCities: (cities: City[]) => set({ cities }),
    setFilteredSortedCities: (cities: City[]) => set({ filteredSortedCities: cities }),
    selectCity: (id) =>
        set((state) => ({
            selectedCityId: state.cities.some((city) => city.id === id) ? id : state.selectedCityId,
        })),
    updateCity: (id: string, key: string, value: number) =>
        set((state) => ({
            cities: state.cities.map(currentCity => currentCity.id === id ? { ...currentCity, [key]: value } : currentCity)
        })),
    setSortBy: (sortBy: SortBy) => set({ sortBy }),
    setSortOrder: (sortOrder: SortOrder) => set({ sortOrder }),
    setFilterRange: (filterRange: [number, number]) => set({ filterRange }),
}));