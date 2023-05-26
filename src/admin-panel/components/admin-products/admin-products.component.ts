import {Component, OnInit} from '@angular/core';
import {ShopService} from "../../../app/services/shop.service";
import {Product} from "../../../app/models/product";
import {BehaviorSubject, first} from "rxjs";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit{
  public products: Product[] = []
  public modal = false;
  public product: Product = new Product();
  public modal2 = false;
  public modal3 = false;

  public searchTerm: string = '';
  public mainProduct: Product[]=[];
  constructor(private shop: ShopService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.shop.getProducts().subscribe(res=> {
      this.products = res;
      this.mainProduct = res;
    });
  }
  editProduct(product: Product){
    this.product = product;
    this.modal = true;
    const bodyList = document.getElementsByTagName('body');
    if (bodyList && bodyList.length > 0) {
      const body = bodyList[0];
      body.classList.add('modal-open');
    }
  }

  addDiscount(product: Product) {
    this.product = product;
    this.modal2 = true;
    const bodyList = document.getElementsByTagName('body');
    if (bodyList && bodyList.length > 0) {
      const body = bodyList[0];
      body.classList.add('modal-open');
    }
  }

  addProduct(){
    this.modal3 = true;
    const bodyList = document.getElementsByTagName('body');
    if (bodyList && bodyList.length > 0) {
      const body = bodyList[0];
      body.classList.add('modal-open');
    }
  }
  closeModal(){
    this.modal = false;
    this.modal2 = false;
    this.modal3 = false;
    const bodyList = document.getElementsByTagName('body');
    if (bodyList && bodyList.length > 0) {
      const body = bodyList[0];
      body.classList.remove('modal-open');
    }
  }
  search(event:any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    if (this.searchTerm.length>0){
      this.products =  this.mainProduct.filter(x=> x.productName.toLowerCase().includes(this.searchTerm.toLowerCase()))
    }
    else {
      this.products = this.mainProduct;
    }
  }

}
