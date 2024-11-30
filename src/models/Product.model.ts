export default interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  category: string;
  subCategory: string[];
  stock: number;
  images: string[];
  ratings: {
    average: number;
    count: number;
  };
  features: string[];
  createdAt: string; // ISO format timestamp
  updatedAt: string; // ISO format timestamp
}
