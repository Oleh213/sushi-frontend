import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ShopService} from "../../services/shop.service";
import {DeliveryTypeValue, Order, OrderStatus} from "../../models/orders";
import {OrderService} from "../../services/order.service";
import {Subscription} from "rxjs";
import {DeliveryTimeOptions, DeliveryType} from "../../models/deliveryOption";

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss']
})
export class OrderInfoComponent implements OnInit{
  private orderId: any;
  public order: Order = new Order();
  private subscriptions: Subscription[] = [];
  public tracker: TrackStage = new TrackStage();
  public deliveryType = '';
  constructor(private activeRoute:ActivatedRoute,
              private shop: ShopService,
              private orderService: OrderService,
              ) {
  }
  ngOnInit(): void {
    this.orderId = this.activeRoute.snapshot.paramMap.get('orderId');
    this.shop.getOrder(this.orderId).subscribe(res=> {
      this.order = res;
      this.checkOrderStatus(res.orderStatus)
      this.checkDeliveryType(res);
    },error => {
      location.href = '/error-page'
    }, )
    this.subscriptions.push(
      this.orderService.retrieveMappedObject()
        .pipe()
        .subscribe( (receivedObj: Order) => { this.addToInbox(receivedObj);}));
  }
  checkOrderStatus(order: OrderStatus){
    if(order === OrderStatus.AwaitingConfirm){
      this.tracker.AvaitngConfirm = true;
    }
    if(order === OrderStatus.Cooking){
      this.tracker.Cooking = true;
      this.tracker.AvaitngConfirm = true;
    }
    if(order === OrderStatus.Delivered || order === OrderStatus.AwaitingPicUp){
      this.tracker.AwatingPicup = true;
      this.tracker.Cooking = true;
      this.tracker.AvaitngConfirm = true;
    }
    if(order === OrderStatus.Completed){
      this.tracker.Finished = true;
      this.tracker.AvaitngConfirm = true;
      this.tracker.Cooking = true;
      this.tracker.AwatingPicup = true;
    }
  }
  protected readonly Order = Order;
  protected readonly OrderStatus = OrderStatus;

  addToInbox(obj: Order) {
    this.order.orderStatus = obj.orderStatus;
    this.checkOrderStatus(obj.orderStatus)
    console.log('Yes!');
  }

  checkDeliveryType(order: Order){
    if(order.deliveryOptions.deliveryType === DeliveryType.OnAddress){
      this.deliveryType =  'Доставка замовлення'
    }
    else {
      this.deliveryType =  'Очікує на самовиніс';
    }
  }

  checkDeliveryTime(order: Order):string{
    if (order.deliveryOptions.deliveryTimeOptions === DeliveryTimeOptions.Asap){
      return 'Якнайшвидше';
    }
    else {
      return order.deliveryOptions.deliveryTime;
    }
  }

  protected readonly DeliveryTypeValue = DeliveryTypeValue;
  protected readonly DeliveryType = DeliveryType;
}

class TrackStage {
  AvaitngConfirm: boolean = false;
  Cooking: boolean = false;
  AwatingPicup: boolean = false;
  Finished: boolean = false;

}

