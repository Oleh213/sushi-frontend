import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {CartItem} from "../../models/cartItem";
import {ShopService} from "../../services/shop.service";
import {Guid} from "guid-typescript";
import {LocalCartItem} from "../../models/localCartItem";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  public cartItems: Array<CartItem> = [];
  public items: Array<LocalCartItem> = Array<LocalCartItem>();
  public show: boolean = false;
  constructor(private shop: ShopService) {
  }
  ngOnInit(): void {
    let items = JSON.parse(localStorage.getItem('localCart')!)
    if(items != null){
      this.shop.getCartItems(items).subscribe(res=> this.cartItems = res)
      this.show = true;
    }
  }

  dellItem(productId: Guid){
    this.items = JSON.parse(localStorage.getItem('localCart')!);
    let newItems = this.cartItems.filter(x=> x.productId !== productId);
    localStorage.removeItem('localCart');
    localStorage.setItem('localCart',JSON.stringify(newItems))
    this.cartItems = this.cartItems.filter(x=> x.productId !== productId);
  }
  dellAll(){
    this.cartItems = [];
    localStorage.removeItem('localCart')
  }


  remove(productId: Guid) {
    let item = this.cartItems.find(x=> x.productId === productId);
    if(item!=null && item.count >1 ){
      this.cartItems.forEach(x=>{
        if(x.productId===productId){
          x.count--;
        }
      });
      localStorage.removeItem('localCart');
      localStorage.setItem('localCart',JSON.stringify(this.cartItems))
    }
    else {
      this.dellItem(productId);
    }

  }

  add(productId: Guid) {
    let item = this.cartItems.find(x=> x.productId === productId);
    if(item!=null && item.count <= 99 ){
      this.cartItems.forEach(x=>{
        if(x.productId===productId){
          x.count++;
        }
      });
      localStorage.removeItem('localCart');
      localStorage.setItem('localCart',JSON.stringify(this.cartItems))
    }
  }

  countTotalPrice(): number{
    let totalPrice = 0;
    for (let item of this.cartItems){
      totalPrice += item.count * item.price;
    }
    return totalPrice;
  }

}
