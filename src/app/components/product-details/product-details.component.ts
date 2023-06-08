import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {ShopService} from "../../services/shop.service";
import {ActivatedRoute} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {Guid} from "guid-typescript";
import {LocalCartItem} from "../../models/localCartItem";
import {CartInfo} from "../../models/cartInfo";


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
  public product: Product = new Product();
  public userCart: Array<LocalCartItem> = new Array<LocalCartItem>();
  public cart = new CartInfo();
  constructor(private shopService: ShopService,
              private activeRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId')!;
    this.shopService.getProduct(productId).subscribe(res=>{
      this.product = res;
      console.log(res.image)
    });
    this.cart = this.shopService.cartInfo();
    this.userCart = JSON.parse(localStorage.getItem('localCart')!);
  }
  checkProductInCart(productId: Guid): boolean{
    if(this.userCart){
      let item = this.userCart.find(x=> x.productId === productId)
      return !!item;
    }
    else return false;
  }
  addToCart(){
    let product = this.product;
    let ok = true;
    if(this.userCart){
      this.userCart.forEach(x=> {
        if(x.productId == product.productId) {
          ok=false;
        }
      });
    }
    if(ok){
      if(product) {
        this.shopService.addToCart(product);
      }
      this.cart.count++;
      this.cart.totalPrice += product.price;
      this.userCart = JSON.parse(localStorage.getItem('localCart')!);
    }
  }
  getCount():number{
    return this.userCart.find(x=> x.productId === this.product.productId)?.count!
  }
  remove() {
    let productId = this.product.productId;
    let item = this.userCart.find(x=> x.productId === productId);
    if(item!=null && item.count >1 ){
      this.userCart.forEach(x=>{
        if(x.productId===productId){
          x.count--;
          this.cart.count --;
          this.cart.totalPrice -= this.product.price;
        }
      });
      localStorage.removeItem('localCart');
      localStorage.setItem('localCart',JSON.stringify(this.userCart))
    }
    else {
      this.cart.count --;
      this.cart.totalPrice -= this.product.price;
      this.dellItem();
    }
  }
  add() {
    let productId = this.product.productId;
    let item = this.userCart.find(x=> x.productId === productId);
    if(item!=null && item.count <= 99 ){
      this.userCart.forEach(x=>{
        if(x.productId===productId){
          x.count++;
          this.cart.count ++;
          this.cart.totalPrice += this.product.price;
        }
      });
      localStorage.removeItem('localCart');
      localStorage.setItem('localCart',JSON.stringify(this.userCart))
    }
  }

  dellItem(){
    let productId = this.product.productId;
    let newItems = this.userCart.filter(x=> x.productId !== productId);
    localStorage.removeItem('localCart');
    localStorage.setItem('localCart',JSON.stringify(newItems))
    this.userCart = this.userCart.filter(x=> x.productId !== productId);
  }
  protected readonly location = location;
}
