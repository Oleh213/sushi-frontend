import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {STORE_API_URL} from "../models/app-injections-tokens";
import {Observable} from "rxjs";
import {Product} from "../models/product";
import {AuthService} from "./auth.service";
import {Category} from "../models/category";
import {CartItem} from "../models/cartItem";
import {LocalCartItem} from "../models/localCartItem";
import {CartInfo} from "../models/cartInfo";
import {ResponseModel} from "../models/ResponseModel";
import {ContactInfo} from "../models/contactInfo";
import {DeliveryOption} from "../models/deliveryOption";
import {PromoCode} from "../models/promoCode";
import {UserRole} from "../models/user";
import {Order, OrderStatus, PaymentMethod} from "../models/orders";
import {Guid} from "guid-typescript";
import {ImagesSlider} from "../models/imagesSlider";
import {OrderResponsModel} from "../models/orderResponsModel";

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  public admin: boolean = false;
  private baseApiUrl = `${this.apiUrl}`
  constructor(private auth: AuthService,
              @Inject(STORE_API_URL) private apiUrl: string,
              private header: HttpClient) { }

  getProducts(): Observable<Product[]>
  {
    return this.auth.getRequest<Product[]>(`${this.baseApiUrl}ProductActions/ShowProducts`)
  }
  getCategory(): Observable<Category[]>{
    return this.auth.getRequest<Category[]>(`${this.apiUrl}CategoryActions/GetAllCategories`)
  }
  getImagesSlider(): Observable<ImagesSlider[]>{
    return this.auth.getRequest<ImagesSlider[]>(`${this.apiUrl}ImagesSliderController/GetImagesSlider`)
  }
  getNewOrders(): Observable<Order[]>{
    return this.auth.getRequest<Order[]>(`${this.apiUrl}OrderActions/GetNewOrders`)
  }
  getUserOrders(orders: string[]): Observable<Order[]>{
    console.log(orders)
    return this.auth.patchRequest<Order[]>(`${this.apiUrl}OrderActions/GetUserOrders`,orders)
  }

  changeOrderStatus(orderId: Guid, orderStatus: OrderStatus) : Observable<ResponseModel<string>>{
    return this.auth.postRequest<ResponseModel<string>>(`${this.apiUrl}OrderActions/ChangeOrderStatus`, {
      orderId: orderId,
      orderStatus: orderStatus,
    })
  }
  getUser(): Observable<UserRole>{
    return this.auth.getRequest<UserRole>(`${this.apiUrl}UserActions/GetUser`)
  }
  getCartItems(products: Array<LocalCartItem>): Observable<CartItem[]>{
    return this.auth.patchRequest<CartItem[]>(`${this.apiUrl}CartItemActions/ShowCart`,products)
  }
  getTotalPrice(products: Array<LocalCartItem>): Observable<ResponseModel<number>>{
    return this.auth.patchRequest<ResponseModel<number>>(`${this.apiUrl}OrderActions/GetTotalPrice`,products)
  }
  getPromoDiscount(code: string): Observable<ResponseModel<number>>{
    return this.auth.postRequest<ResponseModel<number>>(`${this.apiUrl}PromocodeActions/UsePromocode`,{
      code:code
    })
  }
  makeOrder(cartItems: Array<LocalCartItem>, contactInfo: ContactInfo, deliveryInfo: DeliveryOption, paymentMethod: PaymentMethod, promoCode: PromoCode ): Observable<ResponseModel<OrderResponsModel>>{
    return this.auth.postRequest<ResponseModel<OrderResponsModel>>(`${this.apiUrl}OrderActions/Buy`,{cartItems,contactInfo,deliveryInfo,paymentMethod,promoCode})
  }
  getOrder(orderId: string): Observable<Order> {
    return this.auth.getRequest<Order>(`${this.baseApiUrl}OrderActions/GetOrderById?orderId=${orderId}`)
  }
  addToCart(data: Product){
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    let cartItem =  new LocalCartItem();
    cartItem.price = data.price;
    cartItem.productId = data.productId;
    cartItem.count = 1;
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([cartItem]))
    }
    else {
      cartData = JSON.parse(localCart);
      cartData.push(cartItem);
      localStorage.setItem('localCart',JSON.stringify(cartData))
    }
  }
  addUserInfo(data: ContactInfo){
    console.log(data)
    let userInfo = localStorage.getItem('userInfo');
    if(userInfo){
      localStorage.removeItem('userInfo');
      localStorage.setItem('userInfo',JSON.stringify(data))
    }
    else {
      localStorage.setItem('userInfo',JSON.stringify(data))
    }
  }

  addOrderInfo(orderId: string){
    let cartData = [];
    let localCart = localStorage.getItem('orders');
    let order =  new OrderInCart();
    order.orderId = orderId;
    if(!localCart){
      localStorage.setItem('orders',JSON.stringify([order]))
    }
    else {
      cartData = JSON.parse(localCart);
      console.log(cartData);
      cartData.push(order);
      localStorage.setItem('orders',JSON.stringify(cartData))
    }
  }
  checkOrders(){
    let items: OrderInCart[] = JSON.parse(localStorage.getItem('orders')!)
    let convert = items.map(o=> o.orderId)
    if(convert !== null){
      this.getUserOrders(convert).subscribe(res=> {
        if (res.length <1){
          localStorage.removeItem('orders')
        }
      },
        error => {
          localStorage.removeItem('orders')
        })
    }
  }

  ordersInCartInfo(): OrderInCart[] {
    return JSON.parse(localStorage.getItem('orders')!);
  }

  cartInfo(): CartInfo{
    let items = JSON.parse(localStorage.getItem('localCart')!)
    let cart = new CartInfo()
    if(items !== null){
      for(let item of items) {
        cart.count += 1;
        cart.totalPrice += item.price;
      }
      return cart;
    }
    else {
      let cartIfNull = new CartInfo()
      cartIfNull.count = 0;
      cartIfNull.totalPrice = 0;
      return cartIfNull;
    }
  }
}

export class OrderInCart{
  public orderId: string = '';
}
