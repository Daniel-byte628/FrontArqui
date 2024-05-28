
import { OrderItem } from "../vistas/order-details/order-details.component";
import { User } from "./User";

export interface Order {
    orderId: number;
    createdAt: Date;
    userId: number;
    paymentId: number;
    shippingId: number;
    orderItems: OrderItem[];
    user?: User;
  }