import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export interface Order {
  id: number;
  date: string;
  payment: Payment;
  shipment: Shipment;
  items: OrderItem[];
}

export interface Payment {
  id: number;
  date: string;
  method: string;
  amount: number;
  status: string;
}

export interface Shipment {
  id: number;
  deliveryDate: string;
  address: string;
  customerName: string;
  city: string;
}

export interface OrderItem {
  id: number;
  name: string;
  description: string;
  unitPrice: number;
  quantity: number;
}

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent  {

}
