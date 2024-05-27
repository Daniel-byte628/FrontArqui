import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from './service/productos.service';
import { Product } from '../modelo/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Product[] = [];

  constructor(private productosService: ProductosService, private router: Router) { }

  ngOnInit() {
    this.obtenerProductos();
  }
/*
  async eliminarProducto(idProducto: string) {
    try {
      await this.productosService.eliminarProducto(idProducto);
      // Realizar alguna acción después de eliminar el producto, como recargar la lista de productos
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  }*/

   async agregarProducto() {
    try {
      // Aquí puedes redirigir a la página de agregar producto o realizar alguna otra acción
      this.router.navigate(['/agregar-producto']);
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  }

  async obtenerProductos() {
    try {
      const productos = await this.productosService.obtenerProductos();
      console.log('Productos:', productos);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  }
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


