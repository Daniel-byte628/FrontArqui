import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../../modelo/producto';
import { CarritoService } from '../../controlador/carrito/carrito.service';
import { ItemsShoppingCart } from '../../modelo/ItemsShoppingCart';
import { ShoppingCart } from '../../modelo/ShoppingCart';
import { ProductosService } from '../../controlador/service/productos.service';
import * as emailjs from 'emailjs-com';
import { Observable } from 'rxjs';
import { MailersendserviceService } from '../../controlador/servicios/mailersendservice.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit{
  primerCarritoId: number = 0;
  constructor(private http: HttpClient, private carritoservice: CarritoService, private productosService: ProductosService, private mailerSendService: MailersendserviceService) {
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
    const userId = parseInt(localStorage.getItem('userId') || '0');
    if (!userId) {
      console.error('El userId no es válido o no se encontró en el almacenamiento local.');
      return;
    }
  
    this.carritoservice.getShoppingCartsByUserId(userId)
      .subscribe((response: any) => {
        if (response && response.$values && response.$values.length > 0) {
          const shoppingCartId = response.$values[0].id; // Suponiendo que el ID del carrito está en el primer elemento del array
          this.carritoservice.removeItemFromCart(id, shoppingCartId).subscribe(() => {
            this.cartItems = this.cartItems.filter(item => item.id !== id);
          }, error => {
            console.error('Error al eliminar el elemento del carrito:', error);
          });
        } else {
          console.log('No se encontraron carritos de compra para el usuario.');
        }
      }, error => {
        console.error('Error al obtener los carritos de compra:', error);
      });
  }
  
  
  

  


  checkout(): void {
    alert('Procediendo al pago...');

    // Aquí irían tus lógicas para procesar el pago y demás

    // Luego, enviamos el correo electrónico de confirmación
    this.sendEmailConfirmation();
  }

  sendEmailConfirmation(): void {
    // Convertir cartItems a una cadena de texto o a un objeto simple
    const cartItemsString = this.cartItems
      .map(item => {
        if (item.product) {
          return `${item.product.name} - Quantity: ${item.quantityProducts} - Price: ${item.quantityProducts * item.product.unitCost}`;
        } else {
          return '';
        }
      })
      .filter(item => item !== '') // Filtrar los elementos que no tienen producto asociado
      .join('<br>');
    
    const templateParams = {
      to_name: 'Daniel Gutierrez',
      from_name: 'Tienda',
      cartItems: cartItemsString,
      totalPrice: this.getTotalPrice()
    };
  
    emailjs.send('service_8yhd8ie', 'template_6qp2yig', templateParams, 'NOncbOmjeHrrdEHWU')
      .then(() => {
        alert('¡Pedido realizado con éxito! Se ha enviado un correo electrónico de confirmación.');
      })
      .catch((error) => {
        console.error('Error al enviar correo electrónico:', error);
        alert('Hubo un error al procesar tu pedido. Por favor, inténtalo de nuevo más tarde.');
      });
  }
  
  
  

  
}
