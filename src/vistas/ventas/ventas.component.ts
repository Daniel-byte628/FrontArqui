import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../controlador/service/ventas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  constructor(private ventasService: VentasService, private router: Router) {}

  public ventas: any[] = []; // Declara el tipo de ventas como un array de objetos
  public columnas = ['cliente', 'direccion', 'total', 'detalles'];

  async ngOnInit() {
    try {
      const data = await (await this.ventasService.obtenerVentas()); // Convierte el Observable a una promesa
      if (Array.isArray(data)) {
        this.ventas = data;
      } else {
        console.error('El servicio no devolvió un array de ventas:', data);
      }
    } catch (error) {
      console.error('Error al obtener las ventas:', error);
    }
  }

  public verDetalle(id: any) {
    console.log({ id });
    this.router.navigate(['/detalle-venta', id]);
  }
}

