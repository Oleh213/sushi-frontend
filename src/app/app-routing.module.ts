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
import {AdminProductsComponent} from "../admin-panel/components/admin-products/admin-products.component";
import {LayoutComponent} from "../admin-panel/layout/layout.component";
import {AdminShopSettingComponent} from "../admin-panel/components/admin-shop-setting/admin-shop-setting.component";


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
        component: AdminProductsComponent
      },
      {
        path: '',
        component: AdminStatisticComponent
      },
      {
        path: 'shop-setting',
        component: AdminShopSettingComponent,
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
