import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../../modelo/producto';
import { CarritoService } from '../../controlador/carrito/carrito.service';
import { ItemsShoppingCart } from '../../modelo/ItemsShoppingCart';
import { ShoppingCart } from '../../modelo/ShoppingCart';
import { ProductosService } from '../../controlador/service/productos.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit{
  primerCarritoId: number = 0;
  constructor(private http: HttpClient, private carritoservice: CarritoService, private productosService: ProductosService) {
  }

  ngOnInit(): void {
    this.obtenerProductosCarrito();
  }

  cartItems: ItemsShoppingCart[] = []; 


  obtenerProductosCarrito() {
    const userId = parseInt(localStorage.getItem('userId') || '0');
    if (!userId) {
      console.error('El userId no es válido o no se encontró en el almacenamiento local.');
      return;
    }

    this.carritoservice.getShoppingCartsByUserId(userId)
      .subscribe((response: any) => {
        if (response && response.$values && response.$values.length > 0) {
          const primerCarritoId = response.$values[0].id;

          this.carritoservice.obtenerProductosCarrito(primerCarritoId)
            .subscribe((response: any) => {
              if (response && response.$values) {
                const productosCarrito = response.$values;

                productosCarrito.forEach((producto: { productId: number; id: any; shoppingCartId: any; quantityProducts: any; }) => {
                  this.productosService.obtenerProducto(producto.productId)
                    .subscribe((productoDetalle: any) => {
                      const existingItem = this.cartItems.find(item => item.productId === producto.productId);
                      if (existingItem) {
                        existingItem.quantityProducts += producto.quantityProducts;
                      } else {
                        this.cartItems.push({
                          id: producto.id,
                          shoppingCartId: producto.shoppingCartId,
                          productId: producto.productId,
                          quantityProducts: producto.quantityProducts,
                          product: productoDetalle
                        });
                      }
                    }, error => {
                      console.error('Error al obtener el detalle del producto:', error);
                    });
                });
              } else {
                console.error('La respuesta no contiene la propiedad $values');
              }
            }, error => {
              console.error('Error al obtener los productos del carrito:', error);
            });
        } else {
          console.log('No se encontraron carritos de compra para el usuario.');
        }
      }, error => {
        console.error('Error al obtener los carritos de compra:', error);
      });
  }
  


  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      if (item.product && item.product.unitCost !== undefined) {
        return total + (item.quantityProducts * item.product.unitCost);
      }
      return total;
    }, 0);
  }
  
  removeItem(id: number): void {
    this.carritoservice.removeItemFromCart(id).subscribe(() => {
      this.cartItems = this.cartItems.filter(item => item.id !== id);
    }, error => {
      console.error('Error al eliminar el elemento del carrito:', error);
    });
  }

  

  checkout(): void {
    alert('Proceeding to checkout...');
    // Add your checkout logic here
  }
}
