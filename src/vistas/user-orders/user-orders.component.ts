import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import { OrderItemService } from '../../controlador/servicios/order-item.service';
import { Order } from '../../modelo/Order';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.css'
})
export class UserOrdersComponent implements OnInit{
  orders: Order[] = [];
  displayedColumns: string[] = ['orderId', 'createdAt', 'userId', 'details'];

  constructor(private router: Router, private orderService: OrderItemService) {}
  
  ngOnInit(): void {
    this.obtenerAllOrders();
  }

  viewDetails(orderId: number): void {
    this.router.navigate(['/order-details', orderId]);
  }


  obtenerAllOrders(): void {
    const userId = parseInt(localStorage.getItem('userId') || '0');
    console.log(userId)
    if (!userId) {
      console.error('El userId no es válido o no se encontró en el almacenamiento local.');
      return;
    }

    this.orderService.obtenerOrdenesUser(userId).subscribe(
      (response: any) => {
        if (response && response.$values) {
          this.orders = response.$values;
          console.log(this.orders)
        } else {
          console.error('La respuesta no contiene la propiedad $values');
        }
      },
      (error) => {
        console.error('Error al obtener las órdenes:', error);
      }
    );
  }

}
