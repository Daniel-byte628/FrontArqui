import { Injectable } from '@angular/core';
import { Product } from '../../modelo/producto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public async agregarProducto(producto: Product) {
    const url = `${environment.apiUrl}/api/products`;
    return await this.http.post(url, producto);
  }

  public async obtenerProductos(): Promise<any[]> {
    const url =  `${environment.apiUrl}/api/products`;
    try {
      const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true'); // Configurar el encabezado personalizado
      const productos = await this.http.get<any[]>(url, { headers: headers }).toPromise(); // Pasar el encabezado en la configuración de la solicitud
      return productos || []; // Manejar el caso de respuesta undefined devolviendo una matriz vacía
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw error; // Propagar el error para que sea manejado por quien llama a este método
    }
  }


}
