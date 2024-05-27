import { Injectable } from '@angular/core';

import {Payment} from "./payment.service";
import {Shipment} from "./shipment.service";
import {OrderItem} from "../order-details/order-details.component";
@Injectable({
  providedIn: 'root'
})
export class Order {
  constructor(
    public id: number,
    public date: string,
    public payment: Payment,
    public shipment: Shipment,
    public items: OrderItem[]
  ) {}
}
