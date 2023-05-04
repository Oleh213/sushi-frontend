import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {DeliveryOption} from "../../models/deliveryOption";
import {PaymentMethod} from "../../models/paymentMethod";
import {ShopService} from "../../services/shop.service";
import {LocalCartItem} from "../../models/localCartItem";
import {PromoCode} from "../../models/promoCode";
import {ContactInfo} from "../../models/contactInfo";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastService} from "../../toast-notofication/toast.service";
import {MapService} from "../../services/map.service";


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit, AfterViewInit{
  public deliveryOption = new DeliveryOption();
  public paymentMethod = new PaymentMethod();
  public initialHours: Date[] = [];
  public subTotalPrice: number =0;
  public promoCode = new PromoCode();
  public totalPrice: number = 0;
  public contactInfo = new ContactInfo();
  public submit: boolean = false;
  public form: FormGroup = this.formBuilder.group({
    street: [null, Validators.required],
    house: [null, Validators.required],
    flat:[null,],
    entrance:[null,],
    domofon:[null, ],
    flour: [null,]
  });
  private cartItems: Array<LocalCartItem> = [];
  public model = false;

  constructor(private shop: ShopService,
              private formBuilder: FormBuilder,
              private route: Router,
              private toastService: ToastService,
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
      this.buildInitialHours();
    }
    else {
      this.route.navigate(['/menu']);
    }
  }
  ngAfterViewInit(): void {
    this.mapService.checkout();
  }


  buildInitialHours() {
    let hourList: Date[] = [];
    const data = new Date();
    for (let count = 0; count < 48; count++) {
      let lastHour = hourList[hourList.length - 1];
      if (!lastHour) {
        hourList.push(data);
        continue;
      }
      lastHour = new Date();
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

  changePaymentMethod(method: string) {
    if (method === 'cash') {
      this.paymentMethod.cash = true;
      this.paymentMethod.cardOnline = false;
      this.paymentMethod.cardInStore = false;

    } else if (method === 'cardOnline') {
      this.paymentMethod.cash = false;
      this.paymentMethod.cardOnline = true;
      this.paymentMethod.cardInStore = false;
    }
    else if (method === 'cardInStore') {
      this.paymentMethod.cash = false;
      this.paymentMethod.cardOnline = false;
      this.paymentMethod.cardInStore = true;
    }
  }
  changeDeliveryTime(method: string){
    if (method === 'asap') {
      this.deliveryOption.asap = true;
      this.deliveryOption.onTime = false;
    } else if (method === 'onTime') {
      this.deliveryOption.asap = false;
      this.deliveryOption.onTime = true;
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
        if (this.deliveryOption.picUp){
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
    if(this.deliveryOption.picUp){
      this.promoCode.promoDiscount = this.subTotalPrice/10;
    }
    else {
      this.promoCode.promoDiscount = 0;
      this.promoCode.promoDiscount2 = 0;
    }
  }
  changeDeliveryOption(method: string){
    if(method === 'picUp'){
      this.deliveryOption.picUp = true;
      this.deliveryOption.delivery = false;
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
      this.deliveryOption.picUp = false;
      this.deliveryOption.delivery = true;
      if(this.promoCode.promoUsed){
        this.promoCode.promoDiscount = this.promoCode.promoDiscount2;
        this.promoCode.promoDiscount = this.promoCode.promoDiscount2;
      }
      else {
        this.promoCode.promoDiscount = 0;
      }
    }
  }
  checkSubmit(): boolean{
    if(this.contactInfo.name.length>1 && this.contactInfo.phoneNumber.length>6){
      if(this.deliveryOption.delivery && this.deliveryOption.street.length < 1 && this.deliveryOption.house.length < 1){
       return false;
      }
      else{
        if(this.deliveryOption.onTime && this.deliveryOption.deliveryTime.length<1){
          return false;
        }
        else {
          return this.paymentMethod.cardInStore || this.paymentMethod.cardOnline || this.paymentMethod.cash;
        }
      }
    }
    else return false;
  }
  makeOrder(){
    if(this.checkSubmit()){
      this.shop.makeOrder(this.cartItems, this.contactInfo,this.deliveryOption,this.paymentMethod, this.promoCode).subscribe(()=>{
        localStorage.removeItem('localCart');
        this.toastService.showToast('Вітаю!', 'Замовлення оформлено');
        setTimeout(() => {
          this.route.navigate([''])
        }, 4550);
      })
    }
  }

  isShow(): boolean {
    return this.cartItems != null;
  }

}
