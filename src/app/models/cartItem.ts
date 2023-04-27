import {Guid} from "guid-typescript";

export class CartItem{
  public productId: Guid = Guid.createEmpty()
  public productName: string = '';
  public image: string = '';
  public price: number = 0;
  public weight: number = 0;
  public available: number = 0;
  public count: number =0;
}

