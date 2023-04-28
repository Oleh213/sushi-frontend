import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Order, PaymentMethodValues} from "../../../../app/models/orders";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {
  @Output() close = new EventEmitter<void>()
  @Input() data: Order = new Order();
  public paymentMethodValues = PaymentMethodValues;

}
