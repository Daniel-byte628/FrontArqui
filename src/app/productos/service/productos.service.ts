import { Injectable } from '@angular/core';
import { Producto } from '../../modelo/producto';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  constructor(private http: HttpClient) {
  }

  public async eliminarProducto(idProducto: string) {
    return await this.http.delete("/producto?id=".concat(idProducto));
  }

  public async agregarProducto(producto: Producto) {
    return await this.http.post("/producto", producto);
  }

  /*
  El formdata debe tener el id del producto
   */
  public async agregarFotosDeProducto(fotos: FormData) {
    return await this.http.post("/fotos_producto", fotos);
  }

  public async obtenerProductos() {
    return await this.http.get("/productos");
  }

  public async obtenerProductosConFotos() {
    return await this.http.get("/productos_con_fotos");
  }

  public async obtenerProductoConFotosPorId(idProducto: string) {
    return await this.http.get("/producto?id=".concat(idProducto));
  }
}
