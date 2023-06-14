import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { CabinetComponent } from './cabinet/cabinet.component';
@NgModule({
  declarations: [
    LoginPageComponent,
    CabinetComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserCabinetModule { }
