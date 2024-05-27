import { Product } from "./producto";

export interface ProductCategory {
    id: number;
    name: string;
    products: Product[];
  }