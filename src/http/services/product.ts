import { FilterOptions, Product, sortBy } from "../../types";
import { makeRequest } from "../makeRequest";

const SEPARATOR = "↕";

const API_URL = "https://dummyjson.com";

const cache = {
  products: [] as Product[],
};

const fetchData = async () => {
  if (cache.products.length) {
    return cache.products;
  }

  console.log("CACHE:", cache);

  cache.products = await makeRequest<{ products: Product[] }>(
    `${API_URL}/products?limit=50`
  ).then((data) => data.products);

  return cache.products;
};

export const findProducts = async (
  options: Partial<FilterOptions>
): Promise<Product[]> => {
  console.log("SERVICE", options);

  const data = await fetchData();

  const predicates: {
    [key: string]: (item: Product, value: string) => boolean;
  } = {
    category: (item: Product, value: string) =>
      value.split(SEPARATOR).includes(item.category),
    brand: (item: Product, value: string) =>
      value.split(SEPARATOR).includes(item.brand),
    search: (item: Product, value: string) =>
      item.title.toLowerCase().includes(value.toLowerCase()) ||
      item.description.toLowerCase().includes(value.toLowerCase()),
  };

  const sortByPredicate: {
    [k: string]: (itemA: Product, itemB: Product) => number;
  } = {
    [sortBy.priceASC]: (itemA, itemB) => itemA.price - itemB.price,
    [sortBy.priceDESC]: (itemA, itemB) => itemB.price - itemA.price,
    [sortBy.ratingASC]: (itemA, itemB) => itemA.rating - itemB.rating,
    [sortBy.ratingDESC]: (itemA, itemB) => itemB.rating - itemA.rating,
  };

  const { sort, ...filtering } = options;

  return Object.entries(filtering)
    .reduce((products, [key, value]) => {
      return products.filter(
        (item) => predicates[key]?.call(null, item, value) ?? true
      );
    }, data)
    .sort(sortByPredicate[sort as sortBy]);
};

export const findProduct = async (id: string): Promise<Product | null> => {
  return (await fetchData()).find((item) => item.id === Number(id)) ?? null;
};

export const fetchCategories = async (): Promise<string[]> => {
  return [...new Set((await fetchData()).map((item) => item.category))];
};

export const fetchBrands = async (): Promise<string[]> => {
  return [...new Set((await fetchData()).map((item) => item.brand))];
};
