import {Guid} from "guid-typescript";

export class PromoCode{
  public promocodetId: Guid = Guid.createEmpty();
  public code: string = '';
  public discount: number ;
  public count: number ;
}
