import {Component, OnInit} from '@angular/core';
import {ShopService} from "../../app/services/shop.service";
import {AuthService} from "../../app/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit{

  public adminPanel: boolean = false;
  constructor(private shop: ShopService,
              private auth: AuthService,
              public router: Router,) {
  }

  ngOnInit() {
    this.shop.getUser().subscribe(res=> {
      if (res.userRole === 0) {
        this.adminPanel = true;
      }
    })
  }

  logout()
  {
    this.auth.logout()
  }

  protected readonly location = location;
}
