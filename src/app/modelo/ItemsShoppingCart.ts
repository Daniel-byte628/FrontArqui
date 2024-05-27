import { ShoppingCart } from "./ShoppingCart";
import { Producto } from "./producto";

export interface ItemsShoppingCart {
    id: number;
    shoppingCartId: number;
    productId: number;
    quantityProducts: number;
    shoppingCart?: ShoppingCart;
    product?: Producto;
  }