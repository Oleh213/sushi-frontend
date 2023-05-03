import {Guid} from "guid-typescript";

export class LocalCartItem{
  public productId: Guid = Guid.createEmpty();
  public count: number = 0;
  public price: number = 0;
}
