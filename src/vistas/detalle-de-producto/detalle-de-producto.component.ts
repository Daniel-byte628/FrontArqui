import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

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
  public recommendedProducts: Producto[] = [];

  constructor(
    private carritoService: CarritoService,
    private activatedRoute: ActivatedRoute,
    private dataSharingService: DatasharingService,
    private productosService: ProductosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.activatedRoute.snapshot.paramMap.get("id");

    if (productId != null) {
      const numberProductId = Number(productId);
      this.productosService.obtenerProducto(numberProductId).subscribe(
        (inputProducto: Producto) => {
          this.producto = inputProducto;
          this.fetchRecommendedProducts();
        },
        (error) => {
          console.log("Error getting the product information", error);
        }
      );
    }


  }

  fetchProductDetails(id: number): void {
    this.productosService.obtenerProducto(id).subscribe(
      (inputProducto: any) => {
        this.producto = inputProducto.$values;
        console.log(inputProducto);
      },
      (error) => {
        console.log("Error getting the product information", error);
      }
    );
  }


  fetchRecommendedProducts(): void {
    this.productosService.obtenerProductos().subscribe(
      (productos: any) => {
        this.recommendedProducts = productos.$values.sort(() => 0.5 - Math.random()).slice(0, 3); // Get 4 random products
      },
      (error) => {
        console.error('Error fetching recommended products:', error);
      }
    );
  }

  addToCart(producto: Producto): void {
    // this.carritoService.addToCart(producto);
    // Optionally show a notification or update the cart
  }

  viewProduct(productId: number): void {
    this.router.navigate(['/producto/detalle', productId]);
  }

  private getIdFromRoute(): number {
    const idString = this.activatedRoute.snapshot.paramMap.get("id") ?? '0';
    return parseInt(idString, 10);
  }

}
