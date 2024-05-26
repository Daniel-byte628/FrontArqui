import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { VentasComponent } from './ventas/ventas.component';
import { TiendaComponent } from './tienda/tienda.component';
import { DetalleDeProductoComponent } from './detalle-de-producto/detalle-de-producto.component';
import { InicioComponent } from './inicio/inicio.component';
import { PaginaprincipalComponent } from './paginaprincipal/paginaprincipal.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'app', component: AppComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'ventas', component: VentasComponent },
  { path: 'producto/detalle/:id', component: DetalleDeProductoComponent },
  { path: 'tienda', component: TiendaComponent },
  { path: '', component: InicioComponent },
  { path: 'principal', component: PaginaprincipalComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
