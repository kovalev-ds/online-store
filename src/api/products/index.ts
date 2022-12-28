import { FilterOptions, Product, SortBy } from '../../types';
import { makeRequest } from '../makeRequest';

const API_URL = 'https://dummyjson.com';

type ResponseDTO = {
  products: Product[];
  categories: string[];
  brands: string[];
  prices: { min: number; max: number };
  stock: { min: number; max: number };
};

const cache: ResponseDTO = {
  products: [],
  categories: [],
  brands: [],
  prices: { min: 0, max: 0 },
  stock: { min: 0, max: 0 },
};

const fetchData = async (): Promise<ResponseDTO> => {
  if (cache.products.length > 0) {
    return cache;
  }

  const products = await makeRequest<{ products: Product[] }>(`${API_URL}/products?limit=50`).then(
    (data) => data.products
  );

  cache.products = products;
  cache.categories = [...new Set(products.map((item) => item.category))];
  cache.brands = [...new Set(products.map((item) => item.brand))];
  cache.prices = {
    min: Math.min(...products.map((item) => item.price)),
    max: Math.max(...products.map((item) => item.price)),
  };
  cache.stock = {
    min: Math.min(...products.map((item) => item.stock)),
    max: Math.max(...products.map((item) => item.stock)),
  };

  return cache;
};

export const fetchProducts = async (options: Partial<FilterOptions>): Promise<Product[]> => {
  const { sort, ...filtering } = options;
  const { products } = await fetchData();

  return [
    ...Object.entries(filtering).reduce((products, [key, value]) => {
      return products.filter((item) => filterPredicates[key]?.call(null, item, value) ?? true);
    }, products),
  ].sort(sortByPredicates[sort?.toString() as SortBy]);
};

export const fetchProduct = async (id: string): Promise<Product | null> => {
  return (await fetchData()).products.find((item) => item.id === Number(id)) ?? null;
};

export const fetchCategories = async (): Promise<string[]> => {
  return (await fetchData()).categories;
};

export const fetchBrands = async (): Promise<string[]> => {
  return (await fetchData()).brands;
};

export const fetchMinMaxPrice = async () => {
  return (await fetchData()).prices;
};

export const fetchMinMaxStock = async () => {
  return (await fetchData()).stock;
};

const sortByPredicates: {
  [key: string]: (itemA: Product, itemB: Product) => number;
} = {
  [SortBy.priceASC]: (itemA, itemB) => itemA.price - itemB.price,
  [SortBy.priceDESC]: (itemA, itemB) => itemB.price - itemA.price,
  [SortBy.ratingASC]: (itemA, itemB) => itemA.rating - itemB.rating,
  [SortBy.ratingDESC]: (itemA, itemB) => itemB.rating - itemA.rating,
};

const filterPredicates: {
  [key: string]: (item: Product, value: string[]) => boolean;
} = {
  category: (item: Product, value: string[]) =>
    value.some((v) => v.toLowerCase() === item.category.toLowerCase()),
  brand: (item: Product, value: string[]) =>
    value.some((v) => v.toLowerCase() === item.brand.toLowerCase()),
  price: (item: Product, value: string[]) =>
    item.price >= Number(value[0]) && item.price <= Number(value[1]),
  stock: (item: Product, value: string[]) =>
    item.stock >= Number(value[0]) && item.stock <= Number(value[1]),
  search: (item: Product, value: string[]) =>
    item.title.toLowerCase().includes(value.toString().toLowerCase()) ||
    item.description.toLowerCase().includes(value.toString().toLowerCase()),
};
