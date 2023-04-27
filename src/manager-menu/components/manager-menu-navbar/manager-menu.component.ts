import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../app/services/auth.service";
import {User, UserRole} from "../../../app/models/user";
import {ShopService} from "../../../app/services/shop.service";
import {ErrorHandlerService} from "../../../app/errorHandler/errorHandler";

@Component({
  selector: 'app-manager-menu-navbar',
  templateUrl: './manager-menu.component.html',
  styleUrls: ['./manager-menu.component.scss']
})
export class ManagerMenuComponent implements OnInit{

  public user: UserRole = 1;
  constructor(public router: Router,
              private auth: AuthService,
              private shop: ShopService,
              private errorService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    if(this.auth.isAuthenticated()) {
      this.shop.getUser().subscribe(res=>
      {this.user = res},
        error => {
        this.errorService.handleError(error);}
      )
    }
  }

  public logout() {
    location.href = '';
    this.auth.logout();
  }

  protected readonly UserRole = UserRole;
}
