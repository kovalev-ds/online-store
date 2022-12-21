type ID = number;

export type Product = {
  id: ID;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export type FilterOptions = {
  search: string[];
  sort: string[];
  category: string[];
  brand: string[];
  size: string[];
};

export enum sortBy {
  priceASC = "price-ASC",
  priceDESC = "price-DESC",
  ratingASC = "rating-ASC",
  ratingDESC = "rating-DESC",
}
