import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjeta-producto',
  templateUrl: './tarjeta-producto.component.html',
  styleUrls: ['./tarjeta-producto.component.css']
})
export class TarjetaProductoComponent implements OnInit {
  @Input() producto: any;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  public resolverRuta(): string {
    // Aquí puedes construir la URL de la imagen utilizando la descripción del producto
    // Por ejemplo, si la descripción contiene una URL directa a la imagen, podrías retornarla directamente
    return this.producto.descripcion;
  }

  public detalles() {
    this.router.navigate(["/producto/detalle", this.producto.id])
  }

}
