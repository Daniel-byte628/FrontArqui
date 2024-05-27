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
   

    // Si deseas cargar productos desde el servicio, puedes hacerlo así
    // this.productos = await this.productosService.obtenerProductosConFotos();
  }
}
