import {Component, OnInit} from '@angular/core';
import {ShopService} from "./services/shop.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('ua');
    this.translateService.use(localStorage.getItem('lang') || 'ua')
  }
}
