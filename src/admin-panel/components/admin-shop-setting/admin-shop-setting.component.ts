import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShopService} from "../../../app/services/shop.service";
import {ToastService, ToastStatus} from "../../../app/toast-notofication/toast.service";
import {ConfirmationService} from "../../../app/confirmation/confirmation.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-admin-shop-setting',
  templateUrl: './admin-shop-setting.component.html',
  styleUrls: ['./admin-shop-setting.component.scss']
})
export class AdminShopSettingComponent implements OnInit, OnDestroy{
  private subscriptions: Subscription[]=[];
  constructor(private shopService: ShopService,
              private toastService: ToastService,
              ) {
  }
  ngOnInit(): void {
  }
  close(){
    this.subscriptions.push(this.shopService.closeShop().subscribe(res=>{
      this.toastService.showToast('Успішно!','Магазин закритий!', ToastStatus.Success)}
    ));
  }
  open() {
    this.subscriptions.push(this.shopService.openShop().subscribe(res=>{
        this.toastService.showToast('Успішно!','Магазин відкритий!', ToastStatus.Success)}
    ));
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(x=> x.unsubscribe());
  }
}
