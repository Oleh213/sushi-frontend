import {

  Component,
  ElementRef,
  OnDestroy,
  OnInit
} from '@angular/core';
import {BehaviorSubject, filter, first, forkJoin, Subject, Subscription} from "rxjs";
import {ShopService} from "../../services/shop.service";
import {Product} from "../../models/product";
import {Category} from "../../models/category";
import {HeaderComponent} from "../header/header.component";
import {CartInfo} from "../../models/cartInfo";
import {Guid} from "guid-typescript";
import {LocalCartItem} from "../../models/localCartItem";
import {ErrorHandlerService} from "../../errorHandler/errorHandler";
import {style} from "@angular/animations";
import {NgOptimizedImage} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy{
  public products: Array<Product> = new Array<Product>();
  public filterCategory: Array<Product> = new Array<Product>();
  public categories: Array<Category> = Array<Category>();
  public selectedCategory: string = 'Меню';
  private subscriptions: Subscription[] = [];
  public cart = new CartInfo();
  public cartItems = Array<LocalCartItem>();
  public userCart: Array<LocalCartItem> = new Array<LocalCartItem>();
  constructor(private shop: ShopService,
              private el: ElementRef,
              private header: HeaderComponent,
              private error: ErrorHandlerService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
  ){}

  ngOnInit(): void {
    const queryCategory$ = new Subject<''>();
    forkJoin([this.shop.getProducts(), this.shop.getCategory(), queryCategory$])
      .subscribe(([products, categories, categoryName]) => {
          this.products = products.filter(x=> x.available > 0);
          this.filterCategory = products.filter(x=> x.available > 0);
          this.categories = categories;
          if(categories.some(x=> x.categoryName === categoryName)){
            this.changeCategory(categoryName);
          }
        },
        error => {
          console.log('error')
          this.error.handleError(error);
        });
    this.activatedRoute.queryParams.subscribe(params=> {
      if (params['category'] !== undefined){
        const categoryName = params['category'].toString();
        queryCategory$.next(categoryName);
        queryCategory$.complete();
      }
      else {
        queryCategory$.next('');
        queryCategory$.complete();
      }
    })

    this.cart = this.shop.cartInfo();
    this.userCart = JSON.parse(localStorage.getItem('localCart')!);
  }
  ngAfterContentChecked(): void {

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
  }

  checkProductInCart(productId: Guid): boolean{
    if(this.userCart){
      let item = this.userCart.find(x=> x.productId === productId)
      return !!item;
    }
    else return false;
  }

  changeCategory(categoryName: string) {
    this.selectedCategory ='';
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { category: categoryName},
        queryParamsHandling: 'merge',
      });
    this.filterCategory = this.products
      .filter((a:any)=>{
        if(a.categoryName == categoryName || categoryName== ''){
          this.selectedCategory = categoryName;
          return a;
        }
      })
  }


  protected readonly style = style;
  protected readonly location = location;

}
