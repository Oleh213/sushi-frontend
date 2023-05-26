import {Component, OnInit} from '@angular/core';
import {ShopService} from "../../../app/services/shop.service";
import {ToastService, ToastStatus} from "../../../app/toast-notofication/toast.service";

@Component({
  selector: 'app-admin-shop-setting',
  templateUrl: './admin-shop-setting.component.html',
  styleUrls: ['./admin-shop-setting.component.scss']
})
export class AdminShopSettingComponent implements OnInit{
  constructor(private shopService: ShopService,
              private toastService: ToastService
              ) {
  }
  ngOnInit(): void {
  }

  close(){
    this.shopService.closeShop().subscribe(res=>{
      this.toastService.showToast('Успішно!','Магазин закритий!', ToastStatus.Success)
      }
    );
  }
}
