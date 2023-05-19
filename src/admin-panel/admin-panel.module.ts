import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import {RouterOutlet} from "@angular/router";
import { AdminStatisticComponent } from './components/admin-statistic/admin-statistic.component';
import { AdminProductsEditComponent } from './components/admin-products-edit/admin-products-edit.component';
import {SharedModule} from "../shared/shared.module";
import {AgGridModule} from 'ag-grid-angular'


@NgModule({
  declarations: [
    LayoutComponent,
    AdminStatisticComponent,
    AdminProductsEditComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    SharedModule,
    AgGridModule,
  ]
})
export class AdminPanelModule { }
