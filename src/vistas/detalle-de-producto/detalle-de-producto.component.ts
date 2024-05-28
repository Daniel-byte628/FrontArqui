import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { DatasharingService } from '../../controlador/datasharing/datasharing.service';

import { CarritoService } from '../../controlador/carrito/carrito.service';
import { ProductosService } from '../../controlador/service/productos.service';
import { Producto } from '../../modelo/producto';
import {ItemsShoppingCart} from "../../modelo/ItemsShoppingCart";
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';



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
    private carritoservice: CarritoService,
    private activatedRoute: ActivatedRoute,
    private dataSharingService: DatasharingService,
    private productosService: ProductosService,
    private router: Router,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
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

/*
fetchRecommendedProducts(): void {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    console.error('User ID not found in local storage.');
    return;
  }

  const url = `https://bc8d-2800-484-587b-2900-c46e-9342-4c4-1f68.ngrok-free.app/recommendations?user_id=${userId}`;
  this.httpClient.get<any>(url).subscribe(
    (response: any) => {
      // Verifica si la respuesta contiene los datos de productos recomendados de alguna manera
      // Esto puede variar dependiendo de la estructura de la respuesta real
      // En este caso, asumimos que los productos recomendados están directamente en la respuesta
      if (response) {
        // Asigna los productos recomendados a la variable recommendedProducts
        this.recommendedProducts = response;
      } else {
        console.error('No se encontraron productos recomendados en la respuesta.');
      }
    },
    (error) => {
      console.error('Error fetching recommended products:', error);
    }
  );
}*/

  agregarItemAlCarrito(productoId: number): void {
    const userId = parseInt(localStorage.getItem('userId') || '0');
    if (!userId) {
      console.error('El userId no es válido o no se encontró en el almacenamiento local.');
      return;
    }
    console.log(userId);
    this.carritoservice.getShoppingCartsByUserId(userId)
      .subscribe((response: any) => {
        // Verifica si hay carritos de compra en la propiedad $values
        if (response && response.$values && response.$values.length > 0) {
          // Obtiene el primer ID del primer carrito
          const primerCarritoId = response.$values[0].id;
          console.log('Primer ID del primer carrito:', primerCarritoId);

          const item: ItemsShoppingCart = {
            id: 0,
            shoppingCartId: primerCarritoId,
            productId: productoId,
            quantityProducts: 1
          };

          this.carritoservice.agregarItemAlCarrito(item, primerCarritoId).subscribe(
            (response) => {
              console.log('Item agregado al carrito:', response);
              this.snackBar.open('Producto agregado al carrito', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
                panelClass: ['snackbar-success']
              });
            },
            (error) => {
              console.error('Error al agregar el item al carrito:', error);
              this.snackBar.open('Producto agregado al carrito', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
                panelClass: ['snackbar-success']
              });
            }
          );
        } else {
          console.log('No se encontraron carritos de compra para el usuario.');
        }
      }, error => {
        console.error('Error al obtener los carritos de compra:', error);
      });
  }

  viewProduct(productId: number): void {
    this.router.navigate(['/producto/detalle', productId]);
  }

  private getIdFromRoute(): number {
    const idString = this.activatedRoute.snapshot.paramMap.get("id") ?? '0';
    return parseInt(idString, 10);
  }

}
