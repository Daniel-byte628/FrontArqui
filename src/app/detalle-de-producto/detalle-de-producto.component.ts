import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DatasharingService } from '../datasharing/datasharing.service';
import { Producto } from '../modelo/producto';
import { CarritoService } from '../carrito/carrito.service';

@Component({
  selector: 'app-detalle-de-producto',
  templateUrl: './detalle-de-producto.component.html',
  styleUrls: ['./detalle-de-producto.component.css']
})
export class DetalleDeProductoComponent implements OnInit {
  public producto: Producto = {
    id: 1,
    name: "213312",
    description: "132321",
    unitCost: 231123,
    productCategoryId: 0,
    stock: 0,
    reorderPoint: 0,
    productRatings: [],
    supplierProductsOrders: []
  };
  public indiceSeleccionado = 0;
  public yaExiste: boolean = false;

  constructor(
    private carritoService: CarritoService,
    private activatedRoute: ActivatedRoute,
    private dataSharingService: DatasharingService
  ) {}

  ngOnInit(): void {
    this.cargarProducto();
    this.refrescarEstado();
  }

  public resolverFoto(foto: string): string {
    const baseUrl = "http://localhost:4200";
    return `${baseUrl}/foto_producto/${foto}`;
  }

  public seleccionarImagen(indice: number): void {
    this.indiceSeleccionado = indice;
  }

  public async quitarDelCarrito(): Promise<void> {
    const id = this.getIdFromRoute();
    try {
      const respuesta = await this.carritoService.quitarProducto(id);
      console.log({ respuesta });
      this.refrescarEstado();
    } catch (error) {
      console.error("Error al quitar el producto del carrito:", error);
    }
  }

 

  public refrescarEstado(): void {

  }

  private async cargarProducto(): Promise<void> {
    const id = this.getIdFromRoute();
    try {
      // Aquí podrías cargar el producto desde tu servicio de productos
      // Ejemplo:
      // this.producto = await this.productosService.obtenerProducto(id);
    } catch (error) {
      console.error("Error al cargar el producto:", error);
    }
  }

  private getIdFromRoute(): number {
    const idString = this.activatedRoute.snapshot.paramMap.get("id") ?? '0';
    return parseInt(idString, 10);
  }
}
