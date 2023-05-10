
export class DeliveryOption{
  public deliveryType: DeliveryType = DeliveryType.OnAddress;
  public address: string = '';
  public longitude: string = '';
  public latitude: string = '';
  public deliveryTime: string = '';
  public deliveryTimeOptions: DeliveryTimeOptions = DeliveryTimeOptions.Asap;
}
export enum DeliveryType
{
  OnAddress,
  PicUp,
}

export enum DeliveryTimeOptions
{
  Asap,
  OnTime,
}
