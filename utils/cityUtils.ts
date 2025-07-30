import { SORT_BY, SortBy } from '@/components/cities/types/sort.types';
import { City } from '@/constants/Cities';

export const getCityValue = (city: City, sortBy: SortBy): number => {
  switch (sortBy) {
    case SORT_BY.temperature:
      return city.temperature ?? 0;
    case SORT_BY.humidity:
      return city.humidity ?? 0;
    case SORT_BY.precipitation:
      return city.precipitation ?? 0;
    default:
      return 0;
  }
};

export const getValueRange = (cities: City[], sortBy: SortBy): [number, number] => {
  if (sortBy === SORT_BY.name) {
    return [0, 100];
  }

  const values = cities
    .map(city => getCityValue(city, sortBy))
    .filter(value => value !== null && value !== undefined);

  if (values.length === 0) {
    return [0, 100];
  }

  return [Math.min(...values), Math.max(...values)];
};

export const sortCities = (cities: City[], sortBy: SortBy, ascending: boolean): City[] => {
  return cities.slice().sort((a, b) => {
    let result = 0;
    
    if (sortBy === SORT_BY.name) {
      result = a.name.localeCompare(b.name);
    } else {
      result = getCityValue(a, sortBy) - getCityValue(b, sortBy);
    }
    
    return ascending ? result : -result;
  });
};

export const filterCitiesByRange = (
  cities: City[], 
  sortBy: SortBy, 
  range: [number, number]
): City[] => {
  if (sortBy === SORT_BY.name) {
    return cities;
  }

  return cities.filter(city => {
    const value = getCityValue(city, sortBy);
    return value >= range[0] && value <= range[1];
  });
};