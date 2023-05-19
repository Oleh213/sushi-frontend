import {Component, OnInit} from '@angular/core';
import {ShopService} from "../../../app/services/shop.service";
import {Product} from "../../../app/models/product";

@Component({
  selector: 'app-admin-products-edit',
  templateUrl: './admin-products-edit.component.html',
  styleUrls: ['./admin-products-edit.component.scss']
})
export class AdminProductsEditComponent implements OnInit{
  public products: Product[] = []
  constructor(private shop: ShopService) {
  }

  ngOnInit(): void {
    this.shop.getProducts().subscribe(res=> {
      this.products = res;
    });
  }
}
