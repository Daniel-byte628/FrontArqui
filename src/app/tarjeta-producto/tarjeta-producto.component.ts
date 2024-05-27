import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from '../productos/service/productos.service';
import { Producto } from '../modelo/producto';

@Component({
  selector: 'app-tarjeta-producto',
  templateUrl: './tarjeta-producto.component.html',
  styleUrls: ['./tarjeta-producto.component.css']
})
export class TarjetaProductoComponent implements OnInit {
  @Input() producto: Producto | undefined;

  constructor() { }
  
  ngOnInit() {

  }
  


}
