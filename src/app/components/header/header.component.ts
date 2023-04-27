import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {ShopService} from "../../services/shop.service";
import {CartInfo} from "../../models/cartInfo";
import {User, UserRole} from "../../models/user";
import {AuthService} from "../../services/auth.service";
import {HumburgerComponent} from "./humburger/humburger.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  public user: UserRole = 1;
  constructor(private shop: ShopService,
              private auth: AuthService,
              private el: ElementRef,
              private burger: HumburgerComponent,
  ) {
  }
  ngOnInit(): void {
    if(this.auth.isAuthenticated()) {
      this.shop.getUser().subscribe(res=>
        this.user = res
      )
    }
  }
  open(){
    this.burger.onOpen();
  }

  protected readonly UserRole = UserRole;
}
