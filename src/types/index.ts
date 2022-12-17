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

export type SearchOptions = {
  title: string;
  description: string;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  search: string;
};
