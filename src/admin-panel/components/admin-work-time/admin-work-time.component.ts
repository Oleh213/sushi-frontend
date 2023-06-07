import {Component, OnDestroy, OnInit} from '@angular/core';
import {SorterPromoCode, TimeConfig, TimeConfigValue, TimeLine, TimeLineModalOption,} from "../../models/timeLine";
import {ShopService} from "../../../app/services/shop.service";
import {Days} from "../../../manager-menu/pipes/date-format.pipe";
import {ToastService, ToastStatus} from "../../../app/toast-notofication/toast.service";
import {Subscription} from "rxjs";
import {ConfirmationService} from "../../../app/confirmation/confirmation.service";

@Component({
  selector: 'app-admin-work-time',
  templateUrl: './admin-work-time.component.html',
  styleUrls: ['./admin-work-time.component.scss']
})
export class AdminWorkTimeComponent implements OnInit, OnDestroy{
  public timeLines: TimeLine[] = [];
  public timeLinesOriginal: TimeLine[] = [];
  public modalShow = false;
  public selectedTimeLine: TimeLine = new TimeLine();
  public sorterTimeLineStorage = new SorterTimeLineStorage()
  public timeLineModalOption: TimeLineModalOption;
  private subscriptions: Subscription[]=[];

  constructor(private shopService: ShopService,
              private toastService: ToastService,
              private confirmService: ConfirmationService,
              ) {
  }

  ngOnInit(): void {
    this.getTimeLines()
    this.subscriptions.push(this.confirmService.getResult().subscribe(result => {
      if(result){
        this.shopService.deleteTimeInterval(this.selectedTimeLine.timeLineId).subscribe(res=>{
            this.toastService.showToast('Успішно!','Графік видалено!', ToastStatus.Success);
            this.getTimeLines();
        })}
    }));
  }
  getTimeLines() {
    this.shopService.getTimeLines().subscribe(res => {
      this.timeLines = res;
      this.timeLinesOriginal = res;
    })
  }
  sortedBy(key: SorterPromoCode) {
    if (key === SorterPromoCode.Priority){
      if (this.sorterTimeLineStorage.priority){
        this.sorterTimeLineStorage.priority = !this.sorterTimeLineStorage.priority;
        this.timeLines = this.timeLinesOriginal.sort((a, b) => b.priority - a.priority);
      }
      else {
        this.sorterTimeLineStorage.priority = !this.sorterTimeLineStorage.priority;
        this.timeLines = this.timeLinesOriginal.sort((a, b) => a.priority - b.priority);
      }
    }
    else if (key === SorterPromoCode.From){
      if (this.sorterTimeLineStorage.from) {
        this.sorterTimeLineStorage.from = !this.sorterTimeLineStorage.from;
        this.timeLines = this.timeLinesOriginal.sort((a, b) => {
          return <any>new Date(b.from) - <any>new Date(a.from);
        });
      }
      else {
        this.sorterTimeLineStorage.from = !this.sorterTimeLineStorage.from;
        this.timeLines = this.timeLinesOriginal.sort((a, b) => {
          return <any>new Date(a.from) - <any>new Date(b.from);
        });
      }
    }
    else if (key === SorterPromoCode.To){
      if (this.sorterTimeLineStorage.to) {
        this.sorterTimeLineStorage.to = !this.sorterTimeLineStorage.to;
        this.timeLines = this.timeLinesOriginal.sort((a, b) => {
          return <any>new Date(b.to) - <any>new Date(a.to);
        });
      }
      else {
        this.sorterTimeLineStorage.to = !this.sorterTimeLineStorage.to;
        this.timeLines = this.timeLinesOriginal.sort((a, b) => {
          return <any>new Date(a.to) - <any>new Date(b.to);
        });
      }
    }
    else if (key === SorterPromoCode.TimeConfig){
      if (this.sorterTimeLineStorage.to) {
        this.sorterTimeLineStorage.timeConfig = !this.sorterTimeLineStorage.timeConfig;
        this.timeLines = this.timeLinesOriginal.sort((a, b) => {
          return (b.timeConfig) - (a.timeConfig);
        });
      }
      else {
        this.sorterTimeLineStorage.timeConfig = !this.sorterTimeLineStorage.timeConfig;
        this.timeLines = this.timeLinesOriginal.sort((a, b) => {
          return (a.timeConfig) - (b.timeConfig);
        });
      }
    }
    else if (key === SorterPromoCode.IsOpen){
      if (this.sorterTimeLineStorage.isOpen) {
        this.sorterTimeLineStorage.isOpen = !this.sorterTimeLineStorage.isOpen;
        this.timeLines = this.timeLinesOriginal.sort((a, b) => {
          return <any> (b.isOpen) - <any> (a.isOpen);
        });
      }
      else {
        this.sorterTimeLineStorage.isOpen = !this.sorterTimeLineStorage.isOpen;
        this.timeLines = this.timeLinesOriginal.sort((a, b) => {
          return <any> (a.isOpen) - <any> (b.isOpen);
        });
      }
    }
  }


  checkTime(dat: Date,timeLine: TimeLine):string{
    let date = new Date(dat);
    if(timeLine.timeConfig === TimeConfig.Once){
      if (date.getUTCMinutes()<9){
        return `${date.getUTCDate()}.${date.getMonth()} ${date.getHours()}:0${date.getMinutes()}`
      }
      else {
        return `${date.getUTCDate()}.${date.getMonth()} ${date.getHours()}:${date.getMinutes()}`
      }
    }
    else {
      if (date.getUTCMinutes()<9){
        return `${date.getHours()}:0${date.getMinutes()} ${Days.find(x=> x!.key === date.getUTCDay())!.value} `
      }
      else {
        return `${date.getHours()}:${date.getMinutes()} ${Days.find(x=> x!.key === date.getUTCDay())!.value} `
      }
    }
  }

  openModalEdit(timeLine: TimeLine){
    this.selectedTimeLine = timeLine;
    this.timeLineModalOption = TimeLineModalOption.EditTimeLine;
    this.modalShow = true;
  }
  openModalAdd(){
    this.selectedTimeLine = new TimeLine();
    this.selectedTimeLine.timeConfig = TimeConfig.Once;
    this.timeLineModalOption = TimeLineModalOption.AddTimeLine;
    this.modalShow = true;
  }

  deleteTimeLine(timeLine: TimeLine){
    this.selectedTimeLine = timeLine;
    this.confirmService.openModal(`Видалити даний графік? (${timeLine.note})`)
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(x=> x.unsubscribe());
  }

  protected readonly TimeConfigValue = TimeConfigValue;
  protected readonly TimeLine = TimeLine;
  protected readonly SorterTimeLine = SorterPromoCode;

}
export class SorterTimeLineStorage{
  public from: boolean ;
  public to: boolean;
  public priority: boolean;
  public timeConfig: boolean;
  public isOpen: boolean = false;
}
