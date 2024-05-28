import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../../controlador/service/productos.service';
import { Producto } from '../../modelo/producto';
import { ShoppingCart } from '../../modelo/ShoppingCart';
import { ItemsShoppingCart } from '../../modelo/ItemsShoppingCart';
import { CarritoService } from '../../controlador/carrito/carrito.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = [];
  filteredProducts: Producto[] = [];

  constructor(
    private productosService: ProductosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private carritoservice: CarritoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.obtenerProductos();
    this.activatedRoute.queryParams.subscribe(params => {
      const searchQuery = params['search'];
      if (searchQuery) {
        this.filterProducts(searchQuery);
      }
    });
  }

  agregarItemAlCarrito(productoId: number): void {
    const userId = parseInt(localStorage.getItem('userId') || '0');
    if (!userId) {
      console.error('El userId no es válido o no se encontró en el almacenamiento local.');
      return;
    }
    console.log(userId);
    this.carritoservice.getShoppingCartsByUserId(userId)
      .subscribe((response: any) => {
        if (response && response.$values && response.$values.length > 0) {
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

  obtenerProductos() {
    this.productosService.obtenerProductos().subscribe(
      (response: any) => {
        if (response && response.$values) {
          this.productos = response.$values;
          this.filteredProducts = this.productos; // Initialize filtered products
          console.log('Productos obtenidos:', this.productos);
        } else {
          console.error('La respuesta no contiene la propiedad $values');
        }
      },
      error => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  filterProducts(query: string) {
    this.filteredProducts = this.productos.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
  }

}
