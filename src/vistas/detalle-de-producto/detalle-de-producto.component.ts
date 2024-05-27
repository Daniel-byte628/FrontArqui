import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DatasharingService } from '../../controlador/datasharing/datasharing.service';

import { CarritoService } from '../../controlador/carrito/carrito.service';
import { ProductosService } from '../../controlador/service/productos.service';
import { Producto } from '../../modelo/producto';


@Component({
  selector: 'app-detalle-de-producto',
  templateUrl: './detalle-de-producto.component.html',
  styleUrls: ['./detalle-de-producto.component.css']
})
export class DetalleDeProductoComponent implements OnInit {

  public indiceSeleccionado = 0;
  public yaExiste: boolean = false;
  public producto: Producto | undefined; 


  constructor(
    private carritoService: CarritoService,
    private activatedRoute: ActivatedRoute,
    private dataSharingService: DatasharingService,
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
    this.obtenerProducto();
  }



  obtenerProducto() {
    const id = this.getIdFromRoute(); 
    
    this.productosService.obtenerProducto(id).subscribe(
      (producto: Producto) => {
        this.producto = producto;
        console.log('Producto obtenido:', this.producto);
      },
      error => {
        console.error('Error al obtener el producto:', error);
      }
    );
  }
  
  
  
  

  


  
  private getIdFromRoute(): number {
    const idString = this.activatedRoute.snapshot.paramMap.get("id") ?? '0';
    return parseInt(idString, 10);
  }

}