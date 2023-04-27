import {ErrorHandler, forwardRef, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductsComponent } from './components/products/products.component';
import {AUTH_API_URL, STORE_API_URL} from "./models/app-injections-tokens";
import {environments} from "../enviroments/environment";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ShopService} from "./services/shop.service";
import {JwtModule} from "@auth0/angular-jwt";
import {ACCESS_TOKEN_KEY} from "./services/auth.service";
import {CartComponent} from './components/cart/cart.component';
import {LoadingInterceptor} from "../shared/components/loading/loading.interceptor";
import {SpinnerComponent} from "../shared/components/loading/spinner/spinner.component";
import {NgHttpLoaderModule} from "ng-http-loader";
import {CheckoutComponent} from './components/checkout/checkout.component';
import {FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from '../manager-menu/components/login/login.component';
import { ManagerMenuComponent } from '../manager-menu/components/manager-menu-navbar/manager-menu.component';
import { ProfileComponent } from '../manager-menu/components/profile/profile.component';
import { NewOrdersComponent } from '../manager-menu/components/new-orders/new-orders.component';
import { OrderDetailsComponent } from '../manager-menu/components/new-orders/order-details/order-details.component';
import { ToastComponent } from './toast-notofication/toast/toast.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import {IvyCarouselModule} from "angular-responsive-carousel";
import { HumburgerComponent } from './components/header/humburger/humburger.component';
import {ManagerMenuModule} from "../manager-menu/manager-menu.module";
import {SharedModule} from "../shared/shared.module";
import {HashLocationStrategy, LocationStrategy, NgOptimizedImage} from "@angular/common";
import { ErrorPageComponent } from './components/error-page/error-page.component';

export function tokenGetter() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    CartComponent,
    CheckoutComponent,
    LoginComponent,
    ToastComponent,
    MainComponent,
    FooterComponent,
    HumburgerComponent,
    ErrorPageComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgHttpLoaderModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environments.tokenWhiteListedDomains
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    IvyCarouselModule,
    ManagerMenuModule,
    NgOptimizedImage,
  ],
  providers: [{
    provide: AUTH_API_URL,
    useValue: environments.authApi
  },
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true,
    },
    {
      provide: ShopService
    },

    {
      provide: ToastComponent
    },
    {
      provide: HeaderComponent
    },
    {
      provide: HumburgerComponent
    },
    {
      provide: STORE_API_URL,
      useValue: environments.authApi,

    }],
  exports: [
    SpinnerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
