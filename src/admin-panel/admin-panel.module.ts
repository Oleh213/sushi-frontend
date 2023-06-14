import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import {RouterLink, RouterOutlet} from "@angular/router";
import { AdminStatisticComponent } from './components/admin-statistic/admin-statistic.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import {SharedModule} from "../shared/shared.module";
import { AdminShopSettingComponent } from './components/admin-shop-setting/admin-shop-setting.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { ProductEditModalComponent } from './modals/product-edit-modal/product-edit-modal.component'
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AddDiscountModalComponent} from "./modals/add-discount-modal/add-discount-modal.component";
import { AddProductModalComponent } from './modals/add-product-modal/add-product-modal.component';
import { AdminWorkTimeComponent } from './components/admin-work-time/admin-work-time.component';
import { WorkTimeEditModalComponent } from './modals/work-time-edit-modal/work-time-edit-modal.component';
import { AdminSlidersComponent } from './components/admin-sliders/admin-sliders.component';
import { SliderImageModalComponent } from './modals/slider-image-modal/slider-image-modal.component';
import {AddPromoCodeModalComponent} from "./modals/add-promo-code-modal/add-promo-code-modal.component";
import { AdminPromoCodesOptionsComponent } from './components/admin-promo-codes-options/admin-promo-codes-options.component';
import { AddUserModalComponent } from './modals/add-user-modal/add-user-modal.component';
import {AppModule} from "../app/app.module";
import { SearchProductModalComponent } from './modals/search-product-modal/search-product-modal.component';
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
    AdminWorkTimeComponent,
    WorkTimeEditModalComponent,
    AdminSlidersComponent,
    SliderImageModalComponent,
    AddPromoCodeModalComponent,
    AdminPromoCodesOptionsComponent,
    AddUserModalComponent,
    SearchProductModalComponent,
  ],
    imports: [
        CommonModule,
        RouterOutlet,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        NgOptimizedImage,
        AppModule,
        RouterLink
    ],
})
export class AdminPanelModule { }
