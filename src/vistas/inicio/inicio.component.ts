import { Component, OnInit } from '@angular/core';
import { Session, login, handleIncomingRedirect, getDefaultSession } from '@inrupt/solid-client-authn-browser';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
featuredProducts = [
    {
      name: 'Producto 1',
      description: 'Descripción del producto 1.',
      price: '$100',
      image: 'assets/product1.jpg'
    },
    {
      name: 'Producto 2',
      description: 'Descripción del producto 2.',
      price: '$200',
      image: 'assets/product2.jpg'
    },
    {
      name: 'Producto 3',
      description: 'Descripción del producto 3.',
      price: '$300',
      image: 'assets/product3.jpg'
    },
    {
      name: 'Producto 4',
      description: 'Descripción del producto 4.',
      price: '$400',
      image: 'assets/product4.jpg'
    }
  ];
}
