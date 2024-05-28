import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../controlador/carrito/carrito.service';
import { DatasharingService } from '../../controlador/datasharing/datasharing.service';
import {Producto} from "../../modelo/producto";
import {ProductosService} from "../../controlador/service/productos.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-paginaprincipal',
  templateUrl: './paginaprincipal.component.html',
  styleUrl: './paginaprincipal.component.css'
})
export class PaginaprincipalComponent implements OnInit {

  allProducts: Producto[] = [];
  mainProducts: Producto[] = [];


  constructor(
    private productosService: ProductosService, private router: Router) {
  }

  ngOnInit() {
    this.productosService.obtenerProductos().subscribe(
      (productos: any) => {


          this.allProducts = productos.$values
          this.mainProducts = this.allProducts.slice(5, 9)

          console.log(this.allProducts)



      },
      (error) => {
        console.error("Error consiguiendo productos en pagina principal.", error);
      }
    )
  }

  productosPrincipales = this.productosService.obtenerProductos()

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
