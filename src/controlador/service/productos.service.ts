import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../vistas/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Producto } from '../../modelo/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  constructor(private http: HttpClient) {
  }

  public async eliminarProducto(idProducto: string) {
    const url = `${environment.apiUrl}/producto?id=${idProducto}`;
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');

    return await this.http.delete(url, {headers: headers});
  }

  public async agregarProducto(producto: Producto) {
    const url = `${environment.apiUrl}/api/products`;
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');

    return await this.http.post(url, producto, {headers: headers});
  }

  public obtenerProductos(): Observable<Producto[]> {
    const url = `${environment.apiUrl}/api/products`;
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');

    return this.http.get<Producto[]>(url, { headers: headers }).pipe(
      catchError(error => {
        console.error('Error al obtener los productos:', error);
        return throwError(error);
      })
    );
  }

  obtenerProducto(id: number): Observable<Producto> {
    const url =`${environment.apiUrl}/api/products/${id}`;
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');

    return this.http.get<Producto>(url, {headers: headers});
  }
}
