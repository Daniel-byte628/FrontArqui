import { Injectable } from '@angular/core';
import { Producto } from '../../modelo/producto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

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
    const url = `${environment.apiUrl}/producto`;
    return await this.http.post(url, producto);
  }

  obtenerProductos(): Observable<any[]> {
    const url = `${environment.apiUrl}/api/products`;
    return this.http.get<any[]>(url);
  }


}
