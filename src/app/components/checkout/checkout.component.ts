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
  public initialHours: Date[] = [];
  public subTotalPrice: number =0;
  public promoCode = new PromoCode();
  public totalPrice: number = 0;
  public contactInfo: ContactInfo = new ContactInfo();
  public submit: boolean = false;
  private cartItems: Array<LocalCartItem> = [];
  @ViewChild('mapContainer', {static: false}) gmap!: ElementRef;
  constructor(private shop: ShopService,
              private formBuilder: FormBuilder,
              private route: Router,
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
    if(info.name || info.phoneNumber )
    {
      this.contactInfo = info
    }
    this.buildInitialHours();
    console.log(this.initialHours)
  }

  buildInitialHours() {
    let hourList: Date[] = [];
    const data = moment();
    for (let count = 0; count < 48; count++) {
      let lastHour = hourList[hourList.length - 1];
      if (!lastHour) {
        data.set({ hour: 0, minute: 0, seconds: 0 });
        hourList.push(data.toDate());
        continue;
      }
      const newHour = lastHour.getMinutes() == 30 ? lastHour.getHours() + 1 : lastHour.getHours();
      const newMinutes = lastHour.getMinutes() == 0 ? 30 : 0;
      const obj = { hour: newHour, minutes: newMinutes, seconds: 0 };
      lastHour = moment(lastHour).set(obj).toDate();
      hourList.push(lastHour);
    }
    let sort: Date[] = [];
    let hours = new Date().getHours();
    for (let time of hourList){
      if(time.getHours() > hours && time.getHours() > 10 &&time.getHours() < 23){
        sort.push(time);
      }
      this.initialHours = sort;
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
    if(this.contactInfo.name.length> 3 && this.contactInfo.phoneNumber.length >= 10){
      if(this.deliveryOption.deliveryType == DeliveryType.OnAddress && this.mapService.selectedAddress.length < 5 ){
        this.toastService.showToast('Помилка','Ведіть адресу доставки!', ToastStatus.Fail)
       return false;
      }
      else{
        return !(this.deliveryOption.deliveryTimeOptions == DeliveryTimeOptions.OnTime && this.deliveryOption.deliveryTime.length < 1);
      }
    }
    else{
      this.toastService.showToast('Помилка','Ведіть конкта данні!', ToastStatus.Fail)
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
        localStorage.removeItem('localCart');
        location.href =`${res.data}`
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
