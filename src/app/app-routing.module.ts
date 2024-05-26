import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { VentasComponent } from './ventas/ventas.component';
import { TiendaComponent } from './tienda/tienda.component';
import { DetalleDeProductoComponent } from './detalle-de-producto/detalle-de-producto.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  { path: 'productos', component: ProductosComponent },
  { path: 'ventas', component: VentasComponent },
  { path: 'producto/detalle/:id', component: DetalleDeProductoComponent },
  { path: 'tienda', component: TiendaComponent },
  { path: 'inicio', component: InicioComponent },
  { path: '', redirectTo: "/inicio", pathMatch: "full" }, // Ruta vacía redirige a inicio
  { path: '**', redirectTo: "/inicio" }, 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
