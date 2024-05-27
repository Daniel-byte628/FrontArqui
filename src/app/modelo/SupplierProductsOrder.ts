import { Supplier } from "./Supplier";
import { Producto } from "./producto";

export interface SupplierProductsOrder {
    purchaseOrderId: number;
    orderDate: Date;
    productId: number;
    supplierId: number;
    quantity: number;
    price: number;
    product?: Producto;
    supplier?: Supplier;
  }