import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DatasharingService } from '../../controlador/datasharing/datasharing.service';

import { CarritoService } from '../../controlador/carrito/carrito.service';
import { ProductosService } from '../../controlador/service/productos.service';
import { Producto } from '../../modelo/producto';



@Component({
  selector: 'app-detalle-de-producto',
  templateUrl: './detalle-de-producto.component.html',
  styleUrls: ['./detalle-de-producto.component.css']
})
export class DetalleDeProductoComponent implements OnInit {

  public indiceSeleccionado = 0;
  public yaExiste: boolean = false;
  public producto: Producto | undefined;


  constructor(
    private carritoService: CarritoService,
    private activatedRoute: ActivatedRoute,
    private dataSharingService: DatasharingService,
    private productosService: ProductosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get("id");
    let producto: Producto

    console.log(productId)

    if (productId != null){
      const numberProductId = Number(productId)
      console.log(numberProductId)
      this.productosService.obtenerProducto(numberProductId).subscribe(
        (inputProducto: Producto) => {

          this.producto = inputProducto
          console.log(inputProducto)
        },
        (error) => {
          console.log("Error getting the product information", error)
        }
      )
    }


  }

  calculateAverageRating(ratings: { rating: number }[]): number {
    if (!ratings.length) return 0;
    const total = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    return total / ratings.length;
  }

  addToCart(producto: Producto): void {
    //this.carritoService.addToCart(producto);
    alert('Producto agregado al carrito!');
  }

  private getIdFromRoute(): number {
    const idString = this.activatedRoute.snapshot.paramMap.get("id") ?? '0';
    return parseInt(idString, 10);
  }

}
