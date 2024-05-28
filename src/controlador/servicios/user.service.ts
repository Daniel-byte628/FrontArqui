import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../vistas/environments/environment';
import { User } from '../../modelo/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) {
  }

  public async crearUsuario(user: User) {
    const url = `${environment.apiUrl}/api/users`;
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');

    return await this.http.post(url, user, {headers: headers});
  }
  public obtenerUsuarios(): Observable<User[]> {
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');

    return this.http.get<User[]>(`${environment.apiUrl}/api/users`, {headers: headers});
  }

}
