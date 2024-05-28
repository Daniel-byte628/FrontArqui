import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { Producto } from '../../modelo/producto';
import { environment } from '../../vistas/environments/environment';
import { ItemsShoppingCart } from '../../modelo/ItemsShoppingCart';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ShoppingCart } from '../../modelo/ShoppingCart';


@Injectable({
  providedIn: 'root'
})
export class CarritoService{

  private productosEnCarrito: Producto[] = [];

  constructor(private http: HttpClient) {
  }

  public async quitarProducto(idProducto: number) {

  }

  public obtenerProductosCarrito(userId: number): Observable<Producto[]> {
    const url = `${environment.apiUrl}/api/c/itemsshoppingcart/cart/${userId}`;
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');

    return this.http.get<Producto[]>(url, {headers: headers}).pipe(
      catchError((error: any) => {
        console.error('Error al obtener los productos:', error);
        return throwError(error);
      })
    );
  }

  agregarItemAlCarrito(item: ItemsShoppingCart, userId: number): Observable<ItemsShoppingCart> {
    const url = `${environment.apiUrl}/api/c/itemsshoppingcart/cart/${userId}`;
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');

    return this.http.post<ItemsShoppingCart>(url, item, {headers: headers});
  }

  getShoppingCartsByUserId(userId: number): Observable<ShoppingCart[]> {
    const url = `${environment.apiUrl}/api/c/shoppingcarts/user/${userId}`;
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');

    return this.http.get<ShoppingCart[]>(url, {headers: headers});
  }

  removeItemFromCart(itemId: number, shoppingCartId: number): Observable<any> {
    const url = `${environment.apiUrl}/api/c/shoppingcarts/${shoppingCartId}/items/${itemId}`;
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');

    return this.http.delete(url, {headers: headers});
  }


}
