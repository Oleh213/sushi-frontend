import {Guid} from "guid-typescript";

export class ImagesSlider{
  public imagesSliderId: Guid = Guid.createEmpty();
  public image: string = '';
  public description: string = '';
  public imageNumber: number = 0;
}
