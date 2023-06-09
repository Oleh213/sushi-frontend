import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AddressDetails, MapService} from "../../../app/services/map.service";
import {Product} from "../../../app/models/product";
import {ShopService} from "../../../app/services/shop.service";
import {Guid} from "guid-typescript";

@Component({
  selector: 'app-search-product-modal',
  templateUrl: './search-product-modal.component.html',
  styleUrls: ['./search-product-modal.component.scss']
})
export class SearchProductModalComponent{
  @Input() products: Product[] = [];
  @Input() productId: Guid = Guid.createEmpty();
  @Output() close = new EventEmitter<void>()
  @Output() addedItem = new EventEmitter<Guid>()

  constructor(private shopService: ShopService) {
  }

  addItem(productId: Guid){
    this.shopService.addItemToProduct(this.productId.toString(),productId.toString()).subscribe(res=>{
      this.close.emit();

      this.addedItem.emit(productId);
    })
  }


}

