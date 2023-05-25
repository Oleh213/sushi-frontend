import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DeliveryOption, DeliveryTimeOptions, DeliveryType} from "../../models/deliveryOption";
import {ShopService} from "../../services/shop.service";
import {LocalCartItem} from "../../models/localCartItem";
import {PromoCode} from "../../models/promoCode";
import {ContactInfo} from "../../models/contactInfo";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastService, ToastStatus} from "../../toast-notofication/toast.service";
import {MapService} from "../../services/map.service";
import {PaymentMethod} from "../../models/orders";
import * as moment from "moment";


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit, AfterViewInit{
  public deliveryOption = new DeliveryOption();
  public paymentMethod: PaymentMethod = PaymentMethod.CardOnline;
  public initialHours: string[] = [];
  public subTotalPrice: number =0;
  public promoCode = new PromoCode();
  public totalPrice: number = 0;
  public contactInfo: ContactInfo = new ContactInfo();
  public submit: boolean = false;
  private cartItems: Array<LocalCartItem> = [];
  @ViewChild('mapContainer', {static: false}) gmap!: ElementRef;
  constructor(private shop: ShopService,
              public toastService: ToastService,
              public mapService: MapService,
              ) {
  }
  ngOnInit(): void {
    this.cartItems = JSON.parse(localStorage.getItem('localCart')!)
    if(this.cartItems != null){
      this.shop.getTotalPrice(this.cartItems).subscribe(res=>{
        if (res.data){
          this.subTotalPrice = res.data
          this.totalPrice = res.data
        }
      })
    }
    else {
      location.href = "/menu";
    }
    let info = JSON.parse(localStorage.getItem('userInfo')!)
    if(info != null)
    {
      this.contactInfo = info
    }
    console.log(this.detectBrowserName())
  }

  detectBrowserName(): string {
    return this.shop.detectBrowserName()
  }
  buildInitialHours() {
    const now = new Date();
    const minutes = Math.ceil(now.getMinutes() / 15) * 15; // округлюємо хвилини до найближчої 15
    let date = new Date();
    date.setHours(22);
    date.setMinutes(30);
    this.initialHours = [];
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), minutes + 30, 0); // поточний час + 30 хвилин з округленими хвилинами
    for (let i = 0; i < 42; i++) { // 22:00 - поточний час = 41 крок
      const time = new Date(start.getTime() + i * 15 * 60 * 1000);
      const hours = time.getHours().toString().padStart(2, '0'); // додаємо 0 перед годинами, якщо вони меньше 10
      const minutes = time.getMinutes().toString().padStart(2, '0'); // додаємо 0 перед хвилинами, якщо вони меньше 10
      const formattedTime = `${hours}:${minutes}`;
      if (time < date) { // максимальний час 22:00
        this.initialHours.push(formattedTime);
      }
    }
  }
  confirmAddress(){
    if(this.mapService.selectedAddress.length >3){
    }
  }
  openClosePromoField(){
    if(this.promoCode.promoField){
      this.promoCode.promoField = false
      this.clearPromo()
    }
    else{
      this.promoCode.promoField = true
    }
  }
  usePromoCode(){
    this.shop.getPromoDiscount(this.promoCode.usedPromoCode).subscribe(res=>{
      if(res.data){
        if (this.deliveryOption.deliveryType == DeliveryType.PicUp){
          this.promoCode.promoDiscount = res.data + this.subTotalPrice/10;
        }
        else {
          this.promoCode.promoDiscount = res.data;
        }
        this.promoCode.promoDiscount2 = res.data;
        this.promoCode.promoUsed = true;
      }
    })
  }
  clearPromo(){
    if(this.deliveryOption.deliveryType == DeliveryType.PicUp){
      this.promoCode.promoDiscount = this.subTotalPrice/10;
    }
    else {
      this.promoCode.promoDiscount = 0;
      this.promoCode.promoDiscount2 = 0;
    }
  }
  changeDeliveryOption(method: string){
    if(method === 'picUp'){
      this.deliveryOption.deliveryType = DeliveryType.PicUp;
      if(this.promoCode.promoUsed){
        let discount = this.promoCode.promoDiscount2;
        discount+= this.subTotalPrice/10;
        this.promoCode.promoDiscount = discount;
      }
      else {
        this.promoCode.promoDiscount = this.subTotalPrice/10;
      }
    }
    else if(method === 'delivery'){
      this.deliveryOption.deliveryType = DeliveryType.OnAddress;
      if(this.promoCode.promoUsed){
        this.promoCode.promoDiscount = this.promoCode.promoDiscount2;
        this.promoCode.promoDiscount = this.promoCode.promoDiscount2;
      }
      else {
        this.promoCode.promoDiscount = 0;
      }
      this.mapService.checkout();
    }
  }
  checkTime():string{
    const data = moment();
    if(this.deliveryOption.deliveryType === DeliveryType.OnAddress){
      return `${data.hour()} : ${data.minutes()}`
    }
    else {
      return `${data.hour()} : ${data.minutes()}`
    }
  }
  checkSubmit(): boolean{
    if(this.contactInfo.name.length> 1 && this.contactInfo.phoneNumber.length >= 7){
      if(this.deliveryOption.deliveryType == DeliveryType.OnAddress && this.mapService.selectedAddress.length < 5 ){
        this.toastService.showToast('Помилка','Ведіть адресу доставки!', ToastStatus.Fail)
       return false;
      }
      else{
        if(this.deliveryOption.deliveryTimeOptions == DeliveryTimeOptions.OnTime && this.deliveryOption.deliveryTime.length < 1){
          this.toastService.showToast('Помилка','Ведіть час доставки!', ToastStatus.Fail)

          return false;
        }
        else {
          return true;
        }
      }
    }
    else{
      this.toastService.showToast('Помилка','Ведіть імʼя та телефон!', ToastStatus.Fail)
      return false;
    }
  }
  makeOrder(){
    if(this.checkSubmit()){
      this.shop.addUserInfo(this.contactInfo);
      this.deliveryOption.longitude = this.mapService.position.lng.toString();
      this.deliveryOption.latitude = this.mapService.position.lat.toString();
      this.deliveryOption.address = this.mapService.selectedAddress;
      this.shop.makeOrder(this.cartItems, this.contactInfo,this.deliveryOption,this.paymentMethod, this.promoCode).subscribe(res=>{
        if(res.data){
          localStorage.removeItem('localCart');
          this.shop.addOrderInfo(res.data?.orderId.toString(), res.data.href);
          location.href =`${res.data?.href}`
        }
      })
    }
  }

  isShow(): boolean {
    return this.cartItems != null;
  }

  ngAfterViewInit(): void {
    this.mapService.checkout();
  }

  protected readonly DeliveryTimeOptions = DeliveryTimeOptions;
  protected readonly PaymentMethod = PaymentMethod;
  protected readonly DeliveryType = DeliveryType;
  protected readonly ToastStatus = ToastStatus;
}
