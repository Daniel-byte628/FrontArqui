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
export class OrderDetailsComponent {
order: Order | undefined;
  displayedColumns: string[] = ['name', 'description', 'unitPrice', 'quantity'];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    // Simulate fetching the order details
    this.order = this.getOrderDetails(Number(orderId));
  }

  getOrderDetails(orderId: number): Order | undefined {
    const mockOrders: Order[] = [
      // Example orders (same as before, but with items)
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
        },
        items: [
          { id: 301, name: 'Laptop', description: '15-inch, 16GB RAM', unitPrice: 1200.00, quantity: 1 },
          { id: 302, name: 'Mouse', description: 'Wireless', unitPrice: 50.00, quantity: 2 }
        ]
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
        },
        items: [
          { id: 303, name: 'Keyboard', description: 'Mechanical', unitPrice: 100.00, quantity: 1 },
          { id: 304, name: 'Monitor', description: '27-inch 4K', unitPrice: 300.00, quantity: 1 }
        ]
      }
    ];
    return mockOrders.find(order => order.id === orderId);
  }

  trackOrder(): void {
    // Implement navigation to the tracking page
    this.router.navigate(['/track-order', this.order?.shipment.id]);
  }
}
