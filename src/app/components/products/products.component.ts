import { Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {first, Subscription} from "rxjs";
import {ShopService} from "../../services/shop.service";
import {Product} from "../../models/product";
import {Category} from "../../models/category";
import {HeaderComponent} from "../header/header.component";
import {CartInfo} from "../../models/cartInfo";
import {Guid} from "guid-typescript";
import {LocalCartItem} from "../../models/localCartItem";
import {ErrorHandlerService} from "../../errorHandler/errorHandler";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy{
  public products: Array<Product> = new Array<Product>();
  public filterCategory: Array<Product> = new Array<Product>();
  public categories: Array<Category> = Array<Category>();
  public selectedCategory: string = 'Сети';
  private subscriptions: Subscription[] = [];
  public cart = new CartInfo();
  public cartItems = Array<LocalCartItem>();
  public userCart: Array<LocalCartItem> = new Array<LocalCartItem>();
  constructor(private shop: ShopService,
              private el: ElementRef,
              private header: HeaderComponent,
              private error: ErrorHandlerService,
  ){}

  ngOnInit(): void {
    this.subscriptions.push(this.shop.getProducts()
      .pipe(first())
      .subscribe(res => {
        this.products = res
        this.filterCategory = res
        this.changeCategory('Сети')
      },
        error => {
        this.error.handleError(error);
        },
        ))

    this.subscriptions.push(this.shop.getCategory()
      .subscribe(res => {
        this.categories = res
      }))

    this.cart = this.shop.cartInfo();

    this.userCart = JSON.parse(localStorage.getItem('localCart')!);

  }
  ngOnDestroy() {
    this.subscriptions.forEach((x: Subscription) => x.unsubscribe());
  }


  addToCart(product: Product){
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
        this.shop.addToCart(product);
        let myTag = this.el.nativeElement.querySelector(".product");
        if (myTag != null) {
          myTag.classList.add('addProductAnimate');
          setTimeout(() => {
            myTag.classList.add("deActive");
          }, 2000);
          myTag.classList.remove('deActive');
        }
      }
      this.cart.count++;
      this.cart.totalPrice += product.price;
      this.userCart = JSON.parse(localStorage.getItem('localCart')!);
    }
    else {
    }
  }

  checkProductInCart(productId: Guid): boolean{
    if(this.userCart){
      let item = this.userCart.find(x=> x.productId === productId)
      if(item){
        return true;
      }
      else
        return false;
    }
    else return false;

  }

  changeCategory(categoryName: string) {
    this.selectedCategory ='';
    this.filterCategory = this.products
      .filter((a:any)=>{
        if(a.categoryName == categoryName || categoryName== ''){
          this.selectedCategory = categoryName;
          return a;
        }
      })
  }

}
