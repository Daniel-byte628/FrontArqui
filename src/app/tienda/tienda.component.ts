import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../productos/service/productos.service';
import { Producto } from '../modelo/producto';


@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  public productos: Producto[] = [];

  constructor(private productosService: ProductosService) {} 
  
  ngOnInit() {
    this.obtenerProductos();
  }
  obtenerProductos() {
    this.productosService.obtenerProductos().subscribe(
      (response: any) => {
        if (response && response.$values) {
          this.productos = response.$values; // Extraer el arreglo de productos del objeto de respuesta
          console.log('Productos obtenidos:', this.productos);
        } else {
          console.error('La respuesta no contiene la propiedad $values');
          // Manejar la falta de la propiedad $values en la respuesta
        }
      },
      error => {
        console.error('Error al obtener los productos:', error);
        // Manejar el error de manera adecuada
      }
    );
  }


}
