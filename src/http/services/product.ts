import { Product } from "../../types";
import { makeRequest } from "../makeRequest";

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
    `${API_URL}/products?limit=20`
  ).then((data) => data.products);

  return cache.products;
};

export const findProducts = async (): Promise<Product[]> => {
  return await fetchData();
};

export const findProduct = async (id: string) => {
  return (await fetchData()).find((item) => item.id === Number(id));
};
