import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ImagesSlider} from "../../models/imagesSlider";
import {ShopService} from "../../services/shop.service";
import {Router} from "@angular/router";
import {ErrorHandlerService} from "../../errorHandler/errorHandler";
import {MapService} from "../../services/map.service";
import {Product} from "../../models/product";
import {Guid} from "guid-typescript";
import {LocalCartItem} from "../../models/localCartItem";
import {CartInfo} from "../../models/cartInfo";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  public isShow = false;
  public imageSlider: Array<ImagesSlider> = [];
  public newProducts: Product[] = [];
  public actionsProducts: Product[] = [];
  public popularProducts: Product[] = [];
  public userCart: Array<LocalCartItem> = new Array<LocalCartItem>();
  public cart = new CartInfo();
  constructor(private shop: ShopService,
              public router: Router,
              private errorService: ErrorHandlerService,
              public mapService: MapService,
              private titleService: Title,
              private translateService: TranslateService,
  ) {
    this.titleService.setTitle("Umami sushi");
  }
  ngOnInit() {
    this.shop.getImagesSlider().subscribe(res=> {
      this.imageSlider = res;
    },
      error => {
      this.errorService.handleError(error);
      })

    this.cart = this.shop.cartInfo();

    this.shop.getProducts().subscribe(res=> {
      for (let product of res.filter(x=> x.available > 0)){
        if (product.productOption && product.productOption.name === 'Popular'){
          this.popularProducts.push(product);
        }
        else if (product.productOption && product.productOption.name === 'Action'){
          this.actionsProducts.push(product);
        }
        else if (product.productOption && product.productOption.name === 'New'){
          this.newProducts.push(product);
        }
      }
      this.isShow = true;
    })

    this.userCart = JSON.parse(localStorage.getItem('localCart')!);
  }

  checkProductInCart(productId: Guid): boolean{
    if(this.userCart){
      let item = this.userCart.find(x=> x.productId === productId)
      return !!item;
    }
    else return false;
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
      }
      this.userCart = JSON.parse(localStorage.getItem('localCart')!);
    }
    this.cart.count++;
    this.cart.totalPrice += product.price;
  }

  protected readonly location = location;
}
