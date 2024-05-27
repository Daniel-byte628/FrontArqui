import { Supplier } from "./Supplier";
import { Product } from "./producto";

export interface SupplierProductsOrder {
    purchaseOrderId: number;
    orderDate: Date;
    productId: number;
    supplierId: number;
    quantity: number;
    price: number;
    product?: Product;
    supplier?: Supplier;
  }