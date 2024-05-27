import { Producto } from "./producto";

export interface ProductCategory {
    id: number;
    name: string;
    products: Producto[];
  }