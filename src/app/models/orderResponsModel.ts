import {Guid} from "guid-typescript";

export class OrderResponsModel{
  public href: string = '';
  public orderId: Guid = Guid.createEmpty();
}
