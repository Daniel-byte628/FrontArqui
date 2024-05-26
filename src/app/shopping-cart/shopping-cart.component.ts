import { Component } from '@angular/core';
interface CartItem {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {
cartItems: CartItem[] = [
    {
      name: 'Producto 1',
      description: 'Descripción del producto 1.',
      price: 100,
      quantity: 1,
      image: 'assets/product1.jpg'
    },
    {
      name: 'Producto 2',
      description: 'Descripción del producto 2.',
      price: 200,
      quantity: 2,
      image: 'assets/product2.jpg'
    },
    {
      name: 'Producto 3',
      description: 'Descripción del producto 3.',
      price: 300,
      quantity: 1,
      image: 'assets/product3.jpg'
    }
  ];

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  removeItem(item: CartItem): void {
    this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
  }

  checkout(): void {
    alert('Proceeding to checkout...');
    // Add your checkout logic here
  }
}
