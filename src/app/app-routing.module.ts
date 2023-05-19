import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CartComponent} from "./components/cart/cart.component";
import {ProductsComponent} from "./components/products/products.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {LoginComponent} from "../manager-menu/components/login/login.component";
import {ManagerMenuComponent} from "../manager-menu/components/manager-menu-navbar/manager-menu.component";
import {ManagerGuard} from "./guard/manager.guard";
import {ProfileComponent} from "../manager-menu/components/profile/profile.component";
import {NewOrdersComponent} from "../manager-menu/components/new-orders/new-orders.component";
import {MainComponent} from "./components/main/main.component";
import {ErrorPageComponent} from "./components/error-page/error-page.component";
import {ContactComponent} from "./components/contact/contact.component";
import {OrderInfoComponent} from "./components/order-info/order-info.component";
import {AdminPanelModule} from "../admin-panel/admin-panel.module";
import {AdminStatisticComponent} from "../admin-panel/components/admin-statistic/admin-statistic.component";
import {AdminProductsEditComponent} from "../admin-panel/components/admin-products-edit/admin-products-edit.component";
import {LayoutComponent} from "../admin-panel/layout/layout.component";


const routes: Routes = [
  {
    path: 'cart', component: CartComponent,
  },
  {
    path: 'menu', component: ProductsComponent,
  },
  {
    path: 'checkout', component: CheckoutComponent,
  },
  {
    path: 'contact', component: ContactComponent,
  },
  {
    path: 'manager-menu-login', component: LoginComponent,
  },
  {
    path: 'error-page', component: ErrorPageComponent,
  },
  {
    path: '', component: MainComponent,
  },
  {
    path: 'order-info/:orderId', component: OrderInfoComponent,
  },
  {
    path: 'admin-panel', component: LayoutComponent,
    children:[
      {
        path: 'products-edit',
        component: AdminProductsEditComponent
      },
      {
        path: '',
        component: AdminStatisticComponent
      },
    ]
  },
  {
    path: 'manager-menu',
    component: ManagerMenuComponent,
    canActivate: [ManagerGuard],
    children:[
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'new-orders',
        component: NewOrdersComponent
      },
    ]
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
