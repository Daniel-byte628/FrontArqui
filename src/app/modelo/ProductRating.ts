import { Product } from "./producto";

export interface ProductRating {
    id: number;
    ratingDate: Date;
    productId: number;
    rating: number;
    userId: number;
    product?: Product;
  }