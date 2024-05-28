import { Component } from '@angular/core';
import { OrderItemService } from '../../controlador/servicios/order-item.service';


interface Payment {
  date: string;
  amount: number;
  status: string;
}


@Component({
  selector: 'app-user-payments',
  templateUrl: './user-payments.component.html',
  styleUrl: './user-payments.component.css'
})
export class UserPaymentsComponent {


  displayedColumns: string[] = ['date', 'amount', 'status'];
  payments: Payment[] = [];

  constructor(private orderService: OrderItemService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    const totalPriceArray: number[] = JSON.parse(localStorage.getItem('totalPrices') || '[]');

    if (totalPriceArray.length === 0) {
      console.error('No hay precios en el almacenamiento local.');
      this.payments.push({
        date: new Date().toLocaleString(),
        amount: 0,
        status: 'Completado'
      });
    } else {
      totalPriceArray.forEach((price: number) => {
        this.payments.push({
          date: new Date().toLocaleString(),
          amount: price,
          status: 'Completado'
        });
      });
    }
  }

  getOrderPriceFromLocalStorage(orderId: number): number {
    const totalPriceArray: { orderId: number, totalPrice: number }[] = JSON.parse(localStorage.getItem('totalPrices') || '[]');
    const order = totalPriceArray.find(item => item.orderId === orderId);
    return order ? order.totalPrice : 0;
  }
}
