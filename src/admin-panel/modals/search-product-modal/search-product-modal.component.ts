import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AddressDetails, MapService} from "../../../app/services/map.service";
import {Product} from "../../../app/models/product";

@Component({
  selector: 'app-search-product-modal',
  templateUrl: './search-product-modal.component.html',
  styleUrls: ['./search-product-modal.component.scss']
})
export class SearchProductModalComponent {
  @Input() products: Product[] = [];
  @Output() close = new EventEmitter<void>()
  constructor() {
    console.log('Top!')
  }

}

