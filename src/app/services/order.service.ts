import {Inject, Injectable} from '@angular/core';
import * as signalR from "@microsoft/signalr";
import {Observable, Subject} from "rxjs";
import {Order} from "../models/orders";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {STORE_API_URL} from "../models/app-injections-tokens";
import {ResponseModel} from "../models/ResponseModel";
import {ShopService} from "./shop.service";


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private connection: any = new signalR.HubConnectionBuilder().withUrl(`${this.apiUrl}order`)
    .configureLogging(signalR.LogLevel.Information)
    .build();

  readonly POST_URL = `${this.apiUrl}OrderController/Buy`
  private receivedMessageObject: Order = new Order();
  private sharedObj = new Subject<Order>();
  private sharedObjForOrderInfo = new Subject<Order>();

  constructor(private http: HttpClient,
              private auth: AuthService,
              private shopService: ShopService,
              @Inject(STORE_API_URL) private apiUrl: string,
  ) {
    this.connection.onclose(async () => {
      await this.start();
    });

    this.connection.on("MakeOrder", (order: Order) => { this.mapReceivedOrders(order); });
    this.start();
  }
  public async start() {
    try {
      await this.connection.start();
    } catch (err) {
      setTimeout(() => this.start(), 5000);
    }
  }

  private mapReceivedOrders(order: Order): void {
    if(this.shopService.checkOrderInCartById(order.orderId)){
      this.sharedObjForOrderInfo.next(order);
      console.log('Yes!')
    }
    this.receivedMessageObject = order;
    this.sharedObj.next(this.receivedMessageObject);
  }

  public broadcastOrders(order: Order): Observable<ResponseModel<string>>{
    return this.auth.postRequest<ResponseModel<string>>(this.POST_URL, order);
  }

  public retrieveMappedObject(): Observable<Order> {
    return this.sharedObj.asObservable();
  }
  public retrieveMappedObjectForOrderInfo(): Observable<Order> {
    return this.sharedObjForOrderInfo.asObservable();
  }
}
