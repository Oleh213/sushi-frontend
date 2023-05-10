import {Guid} from "guid-typescript";
import {DeliveryOption, DeliveryTimeOptions, DeliveryType} from "./deliveryOption";

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
  public address: string = '';
  public longitude: number = 0;
  public latitude: number = 0;
  public deliveryType =  DeliveryType.OnAddress;
  public deliveryTimeOptions = DeliveryTimeOptions.Asap;
  public deliveryTime: string = '';
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
  AwaitingPayment,
}
export const DeliveryTypeValue = [
  { key: DeliveryType.OnAddress, value: 'Доставка'},
  { key: DeliveryType.PicUp, value: 'Самовиніс' },
]
export const DeliveryTimeOptionsValue = [
  { key: DeliveryTimeOptions.Asap, value: 'Якнайбільше'},
  { key: DeliveryTimeOptions.OnTime, value: 'На час'},
]

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

export const PaymentMethodValues = [
  { key: PaymentMethod.Cash, value: 'Готівкую'},
  { key: PaymentMethod.CardInStore, value: 'Карткою в магазині'},
  { key: PaymentMethod.CardOnline, value: 'Онлайн оплата'},
]
