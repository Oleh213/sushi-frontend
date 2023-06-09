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
import {UserRole} from "../models/user";
import {Order, OrderStatus, PaymentMethod} from "../models/orders";
import {Guid} from "guid-typescript";
import {ImagesSlider} from "../models/imagesSlider";
import {OrderResponsModel} from "../models/orderResponsModel";
import {day} from "ag-grid-enterprise/dist/lib/util/time";
import {ProductOption} from "../../admin-panel/models/productOption";
import {EditProduct} from "../../admin-panel/models/editProduct";
import {AddNewProduct} from "../../admin-panel/models/addNewProduct";
import {TimeLine} from "../../admin-panel/models/timeLine";
import {PromoCode} from "../models/promoCode";
import {PromoCodeModel} from "../models/promoCodeModel";
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  public admin: boolean = false;
  private baseApiUrl = `${this.apiUrl}`
  constructor(private auth: AuthService,
              @Inject(STORE_API_URL) private apiUrl: string,
              private header: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.auth.getRequest<Product[]>(`${this.baseApiUrl}ProductController/ShowProducts`)
  }
  getProductOptions(): Observable<ProductOption[]> {
    return this.auth.getRequest<ProductOption[]>(`${this.baseApiUrl}ProductController/GetProductOptions`)
  }
  getPromoCodes(): Observable<ResponseModel<PromoCode[]>> {
    return this.auth.getRequest<ResponseModel<PromoCode[]>>(`${this.baseApiUrl}PromoCodeController/GetAllPromoCodes`)
  }
  addNewPromo(promo: PromoCode): Observable<ResponseModel<string>> {
    return this.auth.postRequest<ResponseModel<string>>(`${this.baseApiUrl}PromoCodeController/AddNewPromoCode`,promo)
  }
  deletePromoCode(promoCodeId: Guid): Observable<ResponseModel<string>> {
    return this.auth.delRequest<ResponseModel<string>>(`${this.baseApiUrl}PromoCodeController/DeletePromoCode?promoCodeId=${promoCodeId}`)
  }
  editPromoCode(promoCode: PromoCode): Observable<ResponseModel<string>> {
    return this.auth.patchRequest<ResponseModel<string>>(`${this.baseApiUrl}PromoCodeController/EditPromoCode`,promoCode)
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
  addItemToProduct(productId: string, itemId: string): Observable<ResponseModel<OrderResponsModel>>{
    return this.auth.postRequest<ResponseModel<OrderResponsModel>>(`${this.apiUrl}ProductController/AddItemToProduct`,{
      productId: productId,
      itemId: itemId,
    })
  }
  dellItemFromProduct(productId: string, itemId: string): Observable<ResponseModel<OrderResponsModel>>{
    return this.auth.postRequest<ResponseModel<OrderResponsModel>>(`${this.apiUrl}ProductController/DellItemFromProduct`,{
      productId: productId,
      itemId: itemId,
    })
  }
  getImagesSlider(): Observable<ImagesSlider[]>{
    return this.auth.getRequest<ImagesSlider[]>(`${this.apiUrl}ImagesSliderController/GetImagesSlider`)
  }
  getNewOrders(): Observable<Order[]>{
    return this.auth.getRequest<Order[]>(`${this.apiUrl}OrderController/GetNewOrders`)
  }
  getShopStatus(): Observable<boolean>{
    return this.auth.getRequest<boolean>(`${this.apiUrl}TimeLineController/CheckShopStatus`)
  }
  getUserOrders(orders: string[]): Observable<Order[]>{
    return this.auth.patchRequest<Order[]>(`${this.apiUrl}OrderController/GetUserOrders`,orders)
  }
  editImageSlide(file: any): Observable<boolean>{
    return this.auth.patchRequest<boolean>(`${this.apiUrl}ImagesSliderController/UpdateImageSlider`,file)
  }
  deleteImageSlide(imageNumber: number): Observable<boolean>{
    return this.auth.delRequest<boolean>(`${this.apiUrl}ImagesSliderController/DeleteImageSlide?ImageNumber=${imageNumber}`,)
  }
  addImageSlide(file: any): Observable<boolean>{
    return this.auth.postRequest<boolean>(`${this.apiUrl}ImagesSliderController/AddNewSlide`,file)
  }
  editTimeInterval(timeLine: TimeLine): Observable<boolean>{
    return this.auth.patchRequest<boolean>(`${this.apiUrl}TimeLineController/EditTimeLine`,timeLine)
  }
  deleteTimeInterval(timeLineId: Guid):Observable<boolean>{
    return this.auth.delRequest<boolean>(`${this.apiUrl}TimeLineController/DeleteTimeLine?timeLineId=${timeLineId}`)
  }
  addTimeInterval(timeLine: TimeLine): Observable<boolean>{
    return this.auth.postRequest<boolean>(`${this.apiUrl}TimeLineController/AddTimeLine`,timeLine)
  }
  changeOrderStatus(orderId: Guid, orderStatus: OrderStatus) : Observable<ResponseModel<string>>{
    return this.auth.postRequest<ResponseModel<string>>(`${this.apiUrl}OrderController/ChangeOrderStatus`, {
      orderId: orderId,
      orderStatus: orderStatus,
    })
  }
  closeShop(): Observable<boolean>{
    return this.auth.postRequest<boolean>(`${this.apiUrl}TimeLineController/CloseShopTillToday`)
  }
  openShop(): Observable<boolean>{
    return this.auth.postRequest<boolean>(`${this.apiUrl}TimeLineController/OpenShopTillToday`)
  }
  getTimeLines(): Observable<TimeLine[]>{
    return this.auth.getRequest<TimeLine[]>(`${this.apiUrl}TimeLineController/GetTimeLines`)
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
    return this.auth.postRequest<ResponseModel<number>>(`${this.apiUrl}PromoCodeController/UsePromoCode`,{
      code:code
    })
  }
  makeOrder(cartItems: Array<LocalCartItem>, contactInfo: ContactInfo, deliveryInfo: DeliveryOption, paymentMethod: PaymentMethod, promoCode: PromoCodeModel ): Observable<ResponseModel<OrderResponsModel>>{
    return this.auth.postRequest<ResponseModel<OrderResponsModel>>(`${this.apiUrl}OrderController/Buy`,{cartItems,contactInfo,deliveryInfo,paymentMethod,promoCode})
  }
  getOrder(orderId: string): Observable<Order> {
    return this.auth.getRequest<Order>(`${this.baseApiUrl}OrderController/GetOrderById?orderId=${orderId}`)
  }
  getProduct(productId: string): Observable<Product> {
    return this.auth.getRequest<Product>(`${this.baseApiUrl}ProductController/GetOneProduct?ProductId=${productId}`)
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
    let userInfo = localStorage.getItem('userInfo');
    if(userInfo){
      localStorage.removeItem('userInfo');
      localStorage.setItem('userInfo',JSON.stringify(data))
    }
    else {
      localStorage.setItem('userInfo',JSON.stringify(data))
    }
  }

  addOrderInfo(orderId: string, paymentLink: string | null =''){
    let cartData = [];
    let localCart = localStorage.getItem('orders');
    let order =  new OrderInCart();
    order.orderId = orderId;
    order.paymentLink = paymentLink;
    order.paymentDay = new Date();
    if(!localCart){
      localStorage.setItem('orders',JSON.stringify([order]))
    }
    else {
      cartData = JSON.parse(localCart);
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
      },
        error => {
          localStorage.removeItem('orders')
        })
    }
    else {
      localStorage.removeItem('orders')
    }
  }

  checkOrderTime(orders: OrderInCart[]):OrderInCart[]{
    let ordersSorted: OrderInCart[] = []
    const currentTime = new Date();
    if(orders === null || orders === undefined){
      return ordersSorted;
    }
    for (let order of orders){
      const orderDate = new Date(order.paymentDay);
      const futureTime = new Date(orderDate.getTime() + (2 * 24 * 60 * 60 * 1000)); // Adding 2 days in milliseconds
      if(futureTime.getTime() > currentTime.getTime()){
        ordersSorted.push(order);
      }
    }
    return ordersSorted;
  }

  ordersInCartInfo(): OrderInCart[] {
    return this.checkOrderTime(JSON.parse(localStorage.getItem('orders')!));
  }

  cartInfo(): CartInfo{
    let items = JSON.parse(localStorage.getItem('localCart')!)
    let cart = new CartInfo()
    if(items !== null){
      for(let item of items) {
        cart.count += item.count;
        cart.totalPrice += item.price * item.count;
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
  public paymentLink: string | null = '';
  public paymentDay: Date = new Date();
}
