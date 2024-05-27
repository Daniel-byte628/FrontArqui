import { Component } from '@angular/core';


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
  payments: Payment[] = [
    { date: '2023-05-01', amount: 250.00, status: 'Completado' },
    { date: '2023-05-10', amount: 199.99, status: 'Pendiente' },
    { date: '2023-05-15', amount: 350.75, status: 'Completado' },
    { date: '2023-06-01', amount: 125.50, status: 'Fallido' },
  ];
}
