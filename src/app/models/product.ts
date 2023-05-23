import {Guid} from "guid-typescript";

export class Product{
  public productId: Guid =  Guid.createEmpty();
  public productName: string = '';
  public categoryName: string = '';
  public price: number = 0;
  public description: string = '';
  public available: number = 0;
  public discount: number = 0;
  public image: string = '';
  public weight: number = 0;
  public productOption: ProductOption = new ProductOption();
}

export class ProductOption {
  public name: string = '';
}
