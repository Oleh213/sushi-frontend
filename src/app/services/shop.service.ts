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
import {day} from "ag-grid-enterprise/dist/lib/util/time";
import {ProductOption} from "../../admin-panel/models/productOption";
import {EditProduct} from "../../admin-panel/models/editProduct";
import {AddNewProduct} from "../../admin-panel/models/addNewProduct";

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
    return this.auth.getRequest<Product[]>(`${this.baseApiUrl}ProductController/ShowProducts`)
  }
  getProductOptions(): Observable<ProductOption[]>
  {
    return this.auth.getRequest<ProductOption[]>(`${this.baseApiUrl}ProductController/GetProductOptions`)
  }
  getCategory(): Observable<Category[]>{
    return this.auth.getRequest<Category[]>(`${this.apiUrl}CategoryController/GetAllCategories`)
  }
  updateProduct(data: any): Observable<ResponseModel<string>>{
    return this.auth.patchRequest<ResponseModel<string>>(`${this.apiUrl}ProductController/UpdateProduct`,data)
  }
  applyDiscount(productId: string, discount: number): Observable<ResponseModel<string>>{
    return this.auth.patchRequest<ResponseModel<string>>(`${this.apiUrl}DiscountController/AddDiscount`,{
      productId: productId,
      discount: discount,
    })
  }
  clearDiscount(productId: string): Observable<ResponseModel<string>>{
    return this.auth.patchRequest<ResponseModel<string>>(`${this.apiUrl}DiscountController/ClearDiscount`,{
      productId: productId,
    })
  }
  addNewProduct(addNewProduct: any): Observable<ResponseModel<OrderResponsModel>>{
    return this.auth.postRequest<ResponseModel<OrderResponsModel>>(`${this.apiUrl}ProductController/AddProduct`,addNewProduct)
  }
  getImagesSlider(): Observable<ImagesSlider[]>{
    return this.auth.getRequest<ImagesSlider[]>(`${this.apiUrl}ImagesSliderController/GetImagesSlider`)
  }
  getNewOrders(): Observable<Order[]>{
    return this.auth.getRequest<Order[]>(`${this.apiUrl}OrderController/GetNewOrders`)
  }
  getUserOrders(orders: string[]): Observable<Order[]>{
    console.log(orders)
    return this.auth.patchRequest<Order[]>(`${this.apiUrl}OrderController/GetUserOrders`,orders)
  }

  changeOrderStatus(orderId: Guid, orderStatus: OrderStatus) : Observable<ResponseModel<string>>{
    return this.auth.postRequest<ResponseModel<string>>(`${this.apiUrl}OrderController/ChangeOrderStatus`, {
      orderId: orderId,
      orderStatus: orderStatus,
    })
  }
  getUser(): Observable<UserRole>{
    return this.auth.getRequest<UserRole>(`${this.apiUrl}UserController/GetUser`)
  }
  getCartItems(products: Array<LocalCartItem>): Observable<CartItem[]>{
    return this.auth.patchRequest<CartItem[]>(`${this.apiUrl}CartItemController/ShowCart`,products)
  }
  getTotalPrice(products: Array<LocalCartItem>): Observable<ResponseModel<number>>{
    return this.auth.patchRequest<ResponseModel<number>>(`${this.apiUrl}OrderController/GetTotalPrice`,products)
  }
  getPromoDiscount(code: string): Observable<ResponseModel<number>>{
    return this.auth.postRequest<ResponseModel<number>>(`${this.apiUrl}PromoCodeController/UsePromocode`,{
      code:code
    })
  }
  makeOrder(cartItems: Array<LocalCartItem>, contactInfo: ContactInfo, deliveryInfo: DeliveryOption, paymentMethod: PaymentMethod, promoCode: PromoCode ): Observable<ResponseModel<OrderResponsModel>>{
    return this.auth.postRequest<ResponseModel<OrderResponsModel>>(`${this.apiUrl}OrderController/Buy`,{cartItems,contactInfo,deliveryInfo,paymentMethod,promoCode})
  }
  getOrder(orderId: string): Observable<Order> {
    return this.auth.getRequest<Order>(`${this.baseApiUrl}OrderController/GetOrderById?orderId=${orderId}`)
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
    if(items !== null){
      let convert = items.map(o=> o.orderId)
      this.getUserOrders(convert).subscribe(res=> {
        if (res === null || res.length <1){
          localStorage.removeItem('orders')
        }
        // for (let order of res){
        //   if (order.orderTime < new Date()){
        //   }
        // }
      },
        error => {
          localStorage.removeItem('orders')
        })
    }
    else {
      localStorage.removeItem('orders')
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

  detectBrowserName(): string {
    const agent = window.navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }

  transferProductData(product: Product): EditProduct{
    let editProduct = new EditProduct();
    editProduct.productId = product.productId;
    editProduct.productName = product.productName;
    editProduct.price = product.price;
    editProduct.available = product.available;
    editProduct.categoryName = product.categoryName;
    editProduct.weight = product.weight;
    editProduct.discount = product.discount;
    editProduct.description = product.description;

    return editProduct;
  }
}

export class OrderInCart{
  public orderId: string = '';
}
