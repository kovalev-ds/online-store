import { SortBy } from './types';

export const sortByOptions: { name: string; value: SortBy }[] = [
  { name: 'Sort By Price ASC', value: SortBy.priceASC },
  { name: 'Sort By Price DESC', value: SortBy.priceDESC },
  { name: 'Sort By Rating ASC', value: SortBy.ratingASC },
  { name: 'Sort By Rating DESC', value: SortBy.ratingDESC },
];

export const itemPerPageOptions: { name: string; value: string }[] = [
  { name: '3', value: '3' },
  { name: '5', value: '5' },
  { name: '10', value: '10' },
];
