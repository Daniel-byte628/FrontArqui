import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { VentasComponent } from './ventas/ventas.component';
import { TiendaComponent } from './tienda/tienda.component';
import { DetalleDeProductoComponent } from './detalle-de-producto/detalle-de-producto.component';

const routes: Routes = [
  {path: 'productos', component: ProductosComponent},
  {path: 'ventas', component: VentasComponent},
  {path: 'producto/detalle/:id', component: DetalleDeProductoComponent},
  {path: 'tienda', component: TiendaComponent},
  {path: '', redirectTo: "/tienda", pathMatch: "full"},
  {path: '**', redirectTo: "/tienda"},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
