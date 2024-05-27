import { ProductCategory } from "./ProductCategory";
import { ProductRating } from "./ProductRating";
import { SupplierProductsOrder } from "./SupplierProductsOrder";

export interface Product {
  id: number;
  name: string;
  productCategoryId: number;
  description: string;
  unitCost: number;
  stock: number;
  reorderPoint: number;
  productRatings: ProductRating[];
  productCategory?: ProductCategory;
  supplierProductsOrders: SupplierProductsOrder[];
}