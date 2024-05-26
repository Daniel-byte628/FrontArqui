import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../carrito/carrito.service';
import { DatasharingService } from '../datasharing/datasharing.service';

@Component({
  selector: 'app-paginaprincipal',
  templateUrl: './paginaprincipal.component.html',
  styleUrl: './paginaprincipal.component.css'
})
export class PaginaprincipalComponent /*implements OnInit */{
  title = 'e-commerce-angular-node';
  public productos: any[] = []; // Especifica el tipo de los productos
/*
  constructor(private carritoService: CarritoService, private dataSharingService: DatasharingService) {
    // Comunicación entre componentes
    this.dataSharingService.currentMessage.subscribe(mensaje => {
      if (mensaje == "car_updated") {
        this.refrescarCarrito();
      }
    });
  }

  public async refrescarCarrito() {
    try {
      const productosPromise = this.carritoService.obtenerProductos();
      const productos = await productosPromise;
      this.productos = productos as unknown as any[]; 
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  }

  public total() {
    // Utiliza reduce para calcular el total de los precios
    return this.productos.reduce((total, producto) => total + producto.precio, 0);
  }

  ngOnInit(): void {
    this.refrescarCarrito();
  }*/
}
