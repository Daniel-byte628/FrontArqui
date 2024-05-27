import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { VentasComponent } from './ventas/ventas.component';
import { TiendaComponent } from './tienda/tienda.component';
import { DetalleDeProductoComponent } from './detalle-de-producto/detalle-de-producto.component';
import { InicioComponent } from './inicio/inicio.component';
import { PaginaprincipalComponent } from './paginaprincipal/paginaprincipal.component';
import { AppComponent } from './app.component';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {ShoppingCartComponent} from "./shopping-cart/shopping-cart.component";
import {PaymentsComponent} from "./payments/payments.component";
import {UserOrdersComponent} from "./user-orders/user-orders.component";
import {UserPaymentsComponent} from "./user-payments/user-payments.component";
import {OrderTrackingComponent} from "./order-tracking/order-tracking.component";
import {OrderDetailsComponent} from "./order-details/order-details.component";

const routes: Routes = [
  { path: 'app', component: AppComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'ventas', component: VentasComponent },
  { path: 'producto/detalle/:id', component: DetalleDeProductoComponent },
  { path: 'tienda', component: TiendaComponent },
  { path: '', component: InicioComponent },
  { path: 'principal', component: PaginaprincipalComponent },
  { path: "login", component: LoginComponent},
  { path: "signup", component: SignupComponent},
  { path: "shoppingcart", component: ShoppingCartComponent},
  { path: "checkout", component: PaymentsComponent},

  // Routes especific to a user.
  { path: "userOrders", component: UserOrdersComponent},
  { path: "userPayments", component: UserPaymentsComponent},
  { path: "orderTracking", component: OrderTrackingComponent},
  { path: 'order-details/:id', component: OrderDetailsComponent },
  { path: 'track-order/:id', component: OrderTrackingComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
