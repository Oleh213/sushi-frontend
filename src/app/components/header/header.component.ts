import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {OrderInCart, ShopService} from "../../services/shop.service";
import {CartInfo} from "../../models/cartInfo";
import {User, UserRole} from "../../models/user";
import {AuthService} from "../../services/auth.service";
import {HumburgerComponent} from "./humburger/humburger.component";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  public user: User = new User();
  public orders: OrderInCart[] = [];
  public model: boolean = false;
  public modelMobile: boolean = false;
  public language: Languages.Ukraine;
  constructor(private shopService: ShopService,
              private auth: AuthService,
              private el: ElementRef,
              private burger: HumburgerComponent,
              public route: Router,
  ) {
  }
  ngOnInit(): void {
    this.shopService.ping().subscribe(res=> {},error => {
      if (error.status ===0){
        this.route.navigate(['error-status/503']);
      }
    })
    if(this.auth.isAuthenticated()) {
      this.shopService.getUser().subscribe(res=>
        this.user = res)
    }
    this.orders = this.shopService.ordersInCartInfo();
    this.shopService.checkOrders();
  }
  open(){
    this.burger.onOpen();
  }
  checkOrders():boolean {
    let orders = this.shopService.ordersInCartInfo()
    return !(orders === null || orders.length < 1);
  }
  checkManager():boolean{
    let manager = localStorage.getItem('manager');
    return manager!==null &&  manager !== undefined;
  }
  protected readonly UserRole = UserRole;
  protected readonly location = location;

  go() {
    this.auth.isAuthenticated()? this.route.navigate(['manager-menu/new-orders']) : this.route.navigate(['manager-menu-login'])
  }
  checkButton():string{
    return this.auth.isAuthenticated()?this.user.userName !== undefined? this.user.userName : '' : 'Увійти';
  }

  protected readonly window = window;
  protected readonly Languages = Languages;
}
enum Languages {
  English,
  Ukraine,
}
