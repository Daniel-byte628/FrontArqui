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

  constructor() {}
  /* constructor(private productosService: ProductosService) {} */
  async ngOnInit() {
    // Aquí agregamos algunos productos por defecto
    this.productos = [
      {
        id: 1,
        nombre: 'Camiseta',
        precio: 20,
        descripcion: 'https://www.xplora.eu/wp-content/uploads/url-canonicas.jpg'
      },
      {
        id: 2,
        nombre: 'Pantalón',
        precio: 30,
        descripcion: 'https://www.xplora.eu/wp-content/uploads/url-canonicas.jpg'
      },
      {
        id: 3,
        nombre: 'Zapatos',
        precio: 50,
        descripcion: 'https://www.xplora.eu/wp-content/uploads/url-canonicas.jpg'
      }
    ];

    // Si deseas cargar productos desde el servicio, puedes hacerlo así
    // this.productos = await this.productosService.obtenerProductosConFotos();
  }
}
