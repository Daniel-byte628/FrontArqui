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
    return await this.http.post(url, user);
  }
  public obtenerUsuarios(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/api/users`);
  }

}
