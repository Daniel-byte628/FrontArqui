import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from './service/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent /*implements OnInit */{
  public productos: any[] = [];
  public columnas = ['nombre', 'descripcion', 'precio', 'eliminar'];
/*
  constructor(private router: Router, private productosService: ProductosService) {
  }

  async eliminar(producto: { id: any; }) {
    if (!confirm("¿Realmente lo quieres eliminar?")) {
      return;
    }
    await this.productosService.eliminarProducto(producto.id);
    await this.obtenerProductos();
  }

  ngOnInit() {
    this.obtenerProductos();
  }

  async obtenerProductos() {
    const observableProductos = await this.productosService.obtenerProductos();
    observableProductos.subscribe((data: Object) => {
      if (Array.isArray(data)) {
        this.productos = data;
      } else {
        // Manejar el caso en el que el servicio devuelve un objeto en lugar de una matriz
        console.error("El servicio de productos devolvió un objeto en lugar de una matriz.");
      }
    });
  }

  navegarAFormulario() {
    this.router.navigateByUrl("/productos/agregar");
  }*/
}


