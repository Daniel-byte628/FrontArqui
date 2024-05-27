import { ItemsShoppingCart } from "./ItemsShoppingCart";
import { User } from "./User";

export interface ShoppingCart {
    id: number;
    userId: number;
    user?: User;
    items: ItemsShoppingCart[];
  }
  