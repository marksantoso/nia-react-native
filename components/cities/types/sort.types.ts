export const SORT_ORDERS = ['asc', 'desc'] as const;
export type SortOrder = typeof SORT_ORDERS[number];

export const SORT_BY = {
    name: 'name',
    temperature: 'temperature',
    humidity: 'humidity',
    precipitation: 'precipitation',
} as const;
export type SortBy = keyof typeof SORT_BY;

export type NumericSortBy = Exclude<SortBy, 'name'>;