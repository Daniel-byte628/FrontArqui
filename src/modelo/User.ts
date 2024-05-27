import { ShoppingCart } from "./ShoppingCart";

export interface User {
    id: number;
    externalId: string;
    userName: string;
    shoppingCarts: ShoppingCart[];
  }
  