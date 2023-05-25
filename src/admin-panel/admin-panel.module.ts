import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import {RouterOutlet} from "@angular/router";
import { AdminStatisticComponent } from './components/admin-statistic/admin-statistic.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import {SharedModule} from "../shared/shared.module";
import {AgGridModule} from 'ag-grid-angular';
import { AdminShopSettingComponent } from './components/admin-shop-setting/admin-shop-setting.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { ProductEditModalComponent } from './modals/product-edit-modal/product-edit-modal.component'
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AddDiscountModalComponent} from "./modals/add-discount-modal/add-discount-modal.component";
import { AddProductModalComponent } from './modals/add-product-modal/add-product-modal.component';


@NgModule({
  declarations: [
    LayoutComponent,
    AdminStatisticComponent,
    AdminProductsComponent,
    AdminShopSettingComponent,
    AdminOrdersComponent,
    ProductEditModalComponent,
    AddDiscountModalComponent,
    AddProductModalComponent,
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    SharedModule,
    AgGridModule,
    ReactiveFormsModule,
    FormsModule,
    NgOptimizedImage,
  ]
})
export class AdminPanelModule { }
