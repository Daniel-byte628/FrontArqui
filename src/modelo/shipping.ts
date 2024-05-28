import { Order } from "./Order";

export class Shipping {
    shippingId: number;
    address: string;
    clientName: string;
    city: string;
    deliveredAt: Date;
    clientId: number;
    order?: Order;
  
    constructor(
      shippingId: number,
      address: string,
      clientName: string,
      city: string,
      deliveredAt: Date,
      clientId: number,
      order?: Order
    ) {
      this.shippingId = shippingId;
      this.address = address;
      this.clientName = clientName;
      this.city = city;
      this.deliveredAt = deliveredAt;
      this.clientId = clientId;
      this.order = order;
    }
  }
  