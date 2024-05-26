import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Producto } from '../modelo/producto';


@Injectable({
  providedIn: 'root'
})
export class CarritoService{

  private productosEnCarrito: Producto[] = [];

  constructor() { }

  public async quitarProducto(idProducto: number) {
    // Simular la eliminación del producto del carrito
    this.productosEnCarrito = this.productosEnCarrito.filter(producto => producto.id !== idProducto);
    return of(true).pipe(delay(1000)); // Simular una solicitud con retardo
  }

  public async agregarAlCarrito(idProducto: number) {
    // Simular agregar el producto al carrito
    this.productosEnCarrito.push({
      id: idProducto, nombre: 'Producto de prueba', precio: 10,
      descripcion: 'https://www.xplora.eu/wp-content/uploads/url-canonicas.jpg'
    });
    return of(true).pipe(delay(1000)); // Simular una solicitud con retardo
  }

  public async existeEnCarrito(idProducto: number) {
    // Simular la verificación de si el producto está en el carrito
    const existe = this.productosEnCarrito.some(producto => producto.id === idProducto);
    return of(existe).pipe(delay(1000)); // Simular una solicitud con retardo
  }

  async obtenerProductos() {
    // Simular la obtención de los productos en el carrito
    return of(this.productosEnCarrito).pipe(delay(1000)); // Simular una solicitud con retardo
  }

  async terminarCompra(datosCliente: any) {
    // Simular el proceso de finalización de la compra
    return of(true).pipe(delay(1000)); // Simular una solicitud con retardo
  }
}
