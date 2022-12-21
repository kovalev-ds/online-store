import { FilterOptions, Product, sortBy } from "../../types";
import { makeRequest } from "../makeRequest";

const SEPARATOR = "↕";

const API_URL = "https://dummyjson.com";

type ResponseDTO = {
  products: Product[];
  categories: string[];
  brands: string[];
};

const cache: ResponseDTO = {
  products: [],
  categories: [],
  brands: [],
};

const fetchData = async (): Promise<ResponseDTO> => {
  if (cache.products.length) {
    return cache;
  }

  const products = await makeRequest<{ products: Product[] }>(
    `${API_URL}/products?limit=50`
  ).then((data) => data.products);

  cache.products = products;
  cache.categories = [...new Set(products.map((item) => item.category))];
  cache.brands = [...new Set(products.map((item) => item.brand))];

  return cache;
};

export const fetchProducts = async (
  options: Partial<FilterOptions>
): Promise<Product[]> => {
  console.log("SERVICE", options);

  const { sort, ...filtering } = options;
  const { products } = await fetchData();

  return [
    ...Object.entries(filtering).reduce((products, [key, value]) => {
      return products.filter(
        (item) => filterPredicates[key]?.call(null, item, value) ?? true
      );
    }, products),
  ].sort(sortByPredicates[sort?.toString() as sortBy]);
};

export const fetchProduct = async (id: string): Promise<Product | null> => {
  return (
    (await fetchData()).products.find((item) => item.id === Number(id)) ?? null
  );
};

export const fetchCategories = async (): Promise<string[]> => {
  return (await fetchData()).categories;
};

export const fetchBrands = async (): Promise<string[]> => {
  return (await fetchData()).brands;
};

const sortByPredicates: {
  [key: string]: (itemA: Product, itemB: Product) => number;
} = {
  [sortBy.priceASC]: (itemA, itemB) => itemA.price - itemB.price,
  [sortBy.priceDESC]: (itemA, itemB) => itemB.price - itemA.price,
  [sortBy.ratingASC]: (itemA, itemB) => itemA.rating - itemB.rating,
  [sortBy.ratingDESC]: (itemA, itemB) => itemB.rating - itemA.rating,
};

const filterPredicates: {
  [key: string]: (item: Product, value: string[]) => boolean;
} = {
  category: (item: Product, value: string[]) =>
    value.some((v) => v.toLowerCase() === item.category.toLowerCase()),
  brand: (item: Product, value: string[]) =>
    value.some((v) => v.toLowerCase() === item.brand.toLowerCase()),
  search: (item: Product, value: string[]) =>
    item.title.toLowerCase().includes(value.toString().toLowerCase()) ||
    item.description.toLowerCase().includes(value.toString().toLowerCase()),
};
