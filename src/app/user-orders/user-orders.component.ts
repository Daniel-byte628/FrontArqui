import { Component } from '@angular/core';

export interface Order {
  id: number;
  date: string;
  payment: Payment;
  shipment: Shipment;
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

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.css'
})
export class UserOrdersComponent {

    displayedColumns: string[] = ['date', 'paymentAmount', 'paymentStatus', 'deliveryDate', 'address'];
  orders: Order[] = [
    {
      id: 1,
      date: '2023-05-01',
      payment: {
        id: 101,
        date: '2023-05-01',
        method: 'Credit Card',
        amount: 250.00,
        status: 'Completado'
      },
      shipment: {
        id: 201,
        deliveryDate: '2023-05-05',
        address: '123 Main St, Apt 4B',
        customerName: 'John Doe',
        city: 'New York'
      }
    },
    {
      id: 2,
      date: '2023-05-10',
      payment: {
        id: 102,
        date: '2023-05-10',
        method: 'PayPal',
        amount: 199.99,
        status: 'Pendiente'
      },
      shipment: {
        id: 202,
        deliveryDate: '2023-05-15',
        address: '456 Oak St, Apt 2A',
        customerName: 'Jane Smith',
        city: 'Los Angeles'
      }
    }
  ];
}
