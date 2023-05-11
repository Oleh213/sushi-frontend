import {Component, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ShopService} from "../../services/shop.service";
import {Order, OrderStatus} from "../../models/orders";
import {OrderService} from "../../services/order.service";
import {Subscription} from "rxjs";

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

    },error => {
    }, )
    // this.subscriptions.push(this.orderService.retrieveMappedObject()
    //   .pipe(first())
    //   .subscribe( () => {}
    //   ));
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

}

class TrackStage {
  AvaitngConfirm: boolean = false;
  Cooking: boolean = false;
  AwatingPicup: boolean = false;
  Finished: boolean = false;

}
