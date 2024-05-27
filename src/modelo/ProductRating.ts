import { Producto } from "./producto";

export interface ProductRating {
    id: number;
    ratingDate: Date;
    productId: number;
    rating: number;
    userId: number;
    product?: Producto;
  }