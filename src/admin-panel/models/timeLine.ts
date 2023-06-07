import {OrderStatus} from "../../app/models/orders";
import {Guid} from "guid-typescript";

export class TimeLine{
  public timeLineId: Guid = Guid.createEmpty();
  public from: Date = new Date();
  public to: Date = new Date();
  public priority: number = 0;
  public timeConfig: TimeConfig;
  public isOpen: boolean = false;
  public note: string = '';
}

export enum SorterPromoCode{
  From,
  To,
  Priority,
  TimeConfig,
  IsOpen,
}
export enum TimeLineModalOption{
  AddTimeLine,
  EditTimeLine,
}

export enum TimeConfig{
  Repeat ,
  Once ,
}

export const TimeConfigValue = [
  { key: TimeConfig.Repeat, value: 'Повторювати'},
  { key: TimeConfig.Once, value: 'Один раз' },
]
