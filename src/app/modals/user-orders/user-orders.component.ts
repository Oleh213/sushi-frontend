import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OrderInCart, ShopService} from "../../services/shop.service";
import {Order, OrderStatusValues} from "../../models/orders";
import {Guid} from "guid-typescript";

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit{
  @Output() close = new EventEmitter<void>()
  public ordersInCart: OrderInCart[] = [];
  public orders: Order[] = [];

  constructor(private shopService: ShopService) {
  }
  closeModal(){
    this.close.emit()
  }

  ngOnInit(): void {
    this.ordersInCart = this.shopService.ordersInCartInfo();
    let items: OrderInCart[] = JSON.parse(localStorage.getItem('orders')!)
    this.shopService.getUserOrders(items.map(o => o.orderId)).subscribe(
      res=> {
        this.orders = res
      }
    );
  }
  goToPage(orderId: Guid){
    location.href = `/order-info/${orderId}`
  }

  protected readonly OrderStatusValues = OrderStatusValues;
  protected readonly location = location;
}
