import {Component, OnInit} from '@angular/core';
import {ShopService} from "../../../app/services/shop.service";
import {
  DeliveryTypeValue,
  Order,
  OrderStatus,
  OrderStatusValues,
  PaymentMethodValues
} from "../../../app/models/orders";
import {Guid} from "guid-typescript";
import {Subscription} from "rxjs";
import {OrderService} from "../../../app/services/order.service";
import {ErrorHandlerService} from "../../../app/errorHandler/errorHandler";
import {DeliveryType} from "../../../app/models/deliveryOption";

@Component({
  selector: 'app-new-orders',
  templateUrl: './new-orders.component.html',
  styleUrls: ['./new-orders.component.scss'],

})
export class NewOrdersComponent implements OnInit{
  public orders: Array<Order> = [];
  public ordersFilter: Array<Order> = [];
  public orderStatusValues = OrderStatusValues;
  public statuses = OrderStatus;
  public paymentMethodValues = PaymentMethodValues;
  public orderStatuses = OrderStatusValues;
  public model = false;
  public order: Order = new Order();
  private subscriptions: Subscription[] = [];
  public currentFilter: number = 10;
  public allowedStatuses = [
    OrderStatus.AwaitingConfirm,
    OrderStatus.Cooking,
    OrderStatus.Delivered,
    OrderStatus.AwaitingPicUp,
    OrderStatus.AwaitingPayment
  ];

  constructor(private shop: ShopService,
              private orderService: OrderService,
              private errorService: ErrorHandlerService,
  ) {
  }
  ngOnInit(): void {
    this.shop.getNewOrders().subscribe(res=> {
      this.orders = res
      this.ordersFilter = res
      },
      error => {
      // this.errorService.handleError(error);
      });
    this.subscriptions.push(
      this.orderService.retrieveMappedObject()
      .pipe()
      .subscribe( (receivedObj: Order) => { this.addToInbox(receivedObj);}));
  }

  changeCategory(status: number) {
    if(status===10){
      this.ordersFilter = this.orders.filter(x=> x.orderStatus ===
        this.statuses.AwaitingConfirm || x.orderStatus === this.statuses.Cooking || x.orderStatus === this.statuses.Delivered || this.statuses.AwaitingPicUp === x.orderStatus || x.orderStatus !== this.statuses.Completed
      )
    }
    else {
      this.ordersFilter = this.orders.filter(x=> x.orderStatus === status)
    }
  }
  getCount(status: number): number{
    let count = 0;
    if(status === 10){
      this.orders.filter(x=> x.orderStatus ===
        this.statuses.AwaitingConfirm || x.orderStatus === this.statuses.Cooking || x.orderStatus === this.statuses.Delivered || this.statuses.AwaitingPicUp === x.orderStatus || x.orderStatus !== this.statuses.Completed
      ).forEach(x=> {count+=1});
    }
    else {
      this.orders.filter(x=> x.orderStatus === status).forEach(x=> {count+=1});
    }
    return count;
  }

  getDetail(order: Order){
    this.order = order;
    this.model = true;
    const bodyList = document.getElementsByTagName('body');
    if (bodyList && bodyList.length > 0) {
      const body = bodyList[0];
      body.classList.add('modal-open');
    }
  }
  changeStatus(orderId: Guid, orderStatus: OrderStatus){
    this.shop.changeOrderStatus(orderId,orderStatus).subscribe(res=> {
    })
  }
  addToInbox(obj: Order) {
    if(this.ordersFilter.find(x=> x.orderId == obj.orderId))
    {
      this.ordersFilter.forEach(x=>{
        if(x.orderId == obj.orderId){
        x.orderStatus = obj.orderStatus;
        x.deliveryOptions = obj.deliveryOptions;
      }})
      this.changeCategory(this.currentFilter);
      if (obj.orderStatus === OrderStatus.Declined || obj.orderStatus === OrderStatus.Canceled){
        this.orders = this.ordersFilter.filter(x=> x.orderId !== obj.orderId);
        this.ordersFilter = this.ordersFilter.filter(x=> x.orderId !== obj.orderId);
      }
    }
    else {
      let newObj = {...obj};
      this.ordersFilter = this.orders.filter(x=> x.orderId !== obj.orderId)
      this.ordersFilter.push(newObj);
      this.orders.push(newObj)
      this.ordersFilter = this.ordersFilter.sort((a, b) => b.orderNumber - a.orderNumber);
      this.changeCategory(this.currentFilter);
      this.ordersFilter = this.ordersFilter.filter(order => this.allowedStatuses.includes(order.orderStatus));
    }
  }
  changeFilter(status: number){
      this.currentFilter = status
  }

  closeModal(){
    this.model = false;

    const bodyList = document.getElementsByTagName('body');
    if (bodyList && bodyList.length > 0) {
      const body = bodyList[0];
      body.classList.remove('modal-open');
    }
  }


  protected readonly DeliveryType = DeliveryType;
  protected readonly DeliveryTypeValue = DeliveryTypeValue;
}
