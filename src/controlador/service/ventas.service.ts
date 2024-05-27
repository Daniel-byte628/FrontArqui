import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private http: HttpClient) {
  }


  public async obtenerVentas() {
    return await this.http.get("/ventas");
  }

  public async obtenerDetalleDeVenta(idVenta: string) {
    return await this.http.get("/detalle_venta?id=".concat(idVenta));
  }
}
