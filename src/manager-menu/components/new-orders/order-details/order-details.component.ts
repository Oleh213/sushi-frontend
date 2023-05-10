import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Order, PaymentMethodValues} from "../../../../app/models/orders";
import {DeliveryTimeOptions, DeliveryType} from "../../../../app/models/deliveryOption";
import {MapService} from "../../../../app/services/map.service";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements AfterViewInit{
  @Output() close = new EventEmitter<void>()
  @Input() data: Order = new Order();
  public paymentMethodValues = PaymentMethodValues;

  protected readonly DeliveryTimeOptions = DeliveryTimeOptions;
  protected readonly DeliveryType = DeliveryType;

  constructor(private mapService: MapService) {
  }

  ngAfterViewInit(): void {
    if(this.data.deliveryOptions.deliveryType == DeliveryType.OnAddress){
      this.mapService.orderInfo(this.data.deliveryOptions.latitude,this.data.deliveryOptions.longitude);
    }
  }
}
