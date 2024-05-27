import { SupplierProductsOrder } from "./SupplierProductsOrder";

export interface Supplier {
    supplierId: number;
    companyName: string;
    contactNumber: string;
    supplierProductsOrders: SupplierProductsOrder[];
  }