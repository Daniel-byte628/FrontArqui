import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../vistas/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  constructor(private http: HttpClient) { }

  obtenerOrdenesUser(userId: number): Observable<any> {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');

    return this.http.get(`${environment.apiUrl}/api/order/user/1`, {headers: headers});
  }
}
