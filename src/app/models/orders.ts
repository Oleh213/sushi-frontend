import {Guid} from "guid-typescript";

class OrderLists {
  public name: string ='';
  public count: number = 0;
}


export class Order{
  public orderId: Guid = Guid.createEmpty();
  public totalPrice: number = 0;
  public promoUsed: boolean = false;
  public usedPromoCode: string = '';
  public orderTime: Date = new Date();
  public name: string = '';
  public phoneNumber: string = '';
  public surName: string = '';
  public email: string = '';
  public orderNumber: number = 0;
  public paymentMethod = PaymentMethod.Cash;
  public orderStatus = OrderStatus.AwaitingConfirm;
  public deliveryOptions = new DeliveryOptions();
  public orderLists = Array<OrderLists>();
}
export class DeliveryOptions{
  public street: string = '';
  public house: string = '';
  public flat: string = '';
  public entrance: string = '';
  public domofon: string = '';
  public flour: string = '';
  public deliveryTime: string = '';
  public picUp: boolean = false;
  public delivery: boolean = false;
  public asap: boolean = false;
  public onTime: boolean = false;

}

export enum OrderStatus{
  AwaitingConfirm,
  Cooking,
  Delivered,
  AwaitingPicUp,
  Completed,
  Declined,
  Refunded,
  Canceled,
}




export const OrderStatusValues = [
  { key: OrderStatus.AwaitingConfirm, value: 'Очікує підтвердження'},
  { key: OrderStatus.Cooking, value: 'Готується' },
  { key: OrderStatus.Delivered, value: 'Відправленно' },
  { key: OrderStatus.AwaitingPicUp, value: 'Готове до видачі'},
  { key: OrderStatus.Completed, value: 'Виконано' },
  { key: OrderStatus.Refunded, value: 'Refunded' },
  { key: OrderStatus.Declined, value: 'Відхилений' },
  { key: OrderStatus.Canceled, value: 'Скасований' },
]
export enum PaymentMethod
{
  Cash,
  CardInStore,
  CardOnline,
}
export class CurrentFilter{
  public all = false;
  public awaitingConfirm = false;
  public delivered = false;
  public awaitingPicUp = false
  public cooking = false;
}

export const PaymentMethodValues = [
  { key: PaymentMethod.Cash, value: 'Готівкую'},
  { key: PaymentMethod.CardInStore, value: 'Карткою в магазині'},
  { key: PaymentMethod.CardOnline, value: 'Онлайн оплата'},

]
