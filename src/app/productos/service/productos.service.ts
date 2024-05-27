import { Injectable } from '@angular/core';
import { Producto } from '../../modelo/producto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  constructor(private http: HttpClient) {
  }

  public async eliminarProducto(idProducto: string) {
    const url = `${environment.apiUrl}/producto?id=${idProducto}`;
    return await this.http.delete(url);
  }

  public async agregarProducto(producto: Producto) {
    const url = `${environment.apiUrl}/api/products`;
    return await this.http.post(url, producto);
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
    return this.http.get<Producto>(url);
  }
}
