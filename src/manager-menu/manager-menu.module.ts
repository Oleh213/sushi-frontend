import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ManagerMenuComponent} from "./components/manager-menu-navbar/manager-menu.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {NewOrdersComponent} from "./components/new-orders/new-orders.component";
import {OrderDetailsComponent} from "./components/new-orders/order-details/order-details.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {AppModule} from "../app/app.module";
import {SpinnerComponent} from "../shared/components/loading/spinner/spinner.component";
import {SharedModule} from "../shared/shared.module";
import {DateFormatPipe} from "./pipes/date-format.pipe";
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';



@NgModule({
  declarations: [
    ManagerMenuComponent,
    ProfileComponent,
    NewOrdersComponent,
    OrderDetailsComponent,
    DateFormatPipe,
    AdminMenuComponent,
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    SharedModule,
    RouterLink,
  ],
    exports: [
        DateFormatPipe
    ]
})
export class ManagerMenuModule { }
