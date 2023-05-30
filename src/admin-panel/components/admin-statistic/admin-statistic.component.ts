import {Component, OnInit} from '@angular/core';
import {ShopService} from "../../../app/services/shop.service";

@Component({
  selector: 'app-admin-statistic',
  templateUrl: './admin-statistic.component.html',
  styleUrls: ['./admin-statistic.component.scss']
})
export class AdminStatisticComponent implements OnInit{
  public shopStatus: boolean;
  public show: boolean;

  constructor(private shopService: ShopService) {
  }
  ngOnInit(): void {
    this.shopService.getShopStatus().subscribe(res=>{
      this.shopStatus = res;
      this.show = true;
    })
  }

}
