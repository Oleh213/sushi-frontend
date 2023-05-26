import {Component, OnDestroy} from '@angular/core';
import {first, Subscription} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../../app/services/auth.service";
import {Router} from "@angular/router";
import {ShopService} from "../../../app/services/shop.service";
import {Title} from "@angular/platform-browser";
import {ErrorHandlerService} from "../../../app/errorHandler/errorHandler";
import {ToastService, ToastStatus} from "../../../app/toast-notofication/toast.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy{

  public isSignUp = false;
  public subscriptions: Subscription[] = [];
  public loginForm = new FormGroup({
    name: new FormControl(''),
    password: new FormControl('')
  });
  constructor(public auth: AuthService,
              public route: Router,
              public shop: ShopService,
              public titleService:Title,
              private errorHandler: ErrorHandlerService,
              private toastService: ToastService
  ) {
    this.titleService.setTitle("Login");
  }
  ngOnDestroy() {
    this.subscriptions.forEach((x: Subscription) => x.unsubscribe());
  }
  login() {
    if(this.loginForm.value.name && this.loginForm.value.password){
      let name: string = this.loginForm.value.name;
      let password: string =this.loginForm.value.password;
      this.subscriptions.push(this.auth.login(name,password)
        .pipe(first())
        .subscribe(res=> {
          location.href = 'manager-menu/new-orders'
        }, errorData => {
          this.toastService.showToast('Помилка!','Некоректні дані!', ToastStatus.Fail)
        }))
    }

  }

  isLogin():boolean{
    if (this.auth.isAuthenticated()){
      location.href = 'manager-menu/new-orders'
      return true;
    }
    else return false;
  }


}
