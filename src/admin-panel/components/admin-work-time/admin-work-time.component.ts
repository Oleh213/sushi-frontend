import {Component, OnInit} from '@angular/core';
import {SorterTimeLine, TimeConfig, TimeConfigValue, TimeLine, TimeLineModalOption,} from "../../models/timeLine";
import {ShopService} from "../../../app/services/shop.service";
import {Days} from "../../../manager-menu/pipes/date-format.pipe";

@Component({
  selector: 'app-admin-work-time',
  templateUrl: './admin-work-time.component.html',
  styleUrls: ['./admin-work-time.component.scss']
})
export class AdminWorkTimeComponent implements OnInit {
  public timeLines: TimeLine[] = [];
  public timeLinesOriginal: TimeLine[] = [];
  public modalShow = false;
  public selectedTimeLine: TimeLine = new TimeLine();
  public sorterTimeLineStorage = new SorterTimeLineStorage()
  public timeLineModalOption: TimeLineModalOption;
  constructor(private shopService: ShopService) {
  }

  ngOnInit(): void {
    this.getTimeLines()
  }
  getTimeLines() {
    this.shopService.getTimeLines().subscribe(res => {
      this.timeLines = res;
      this.timeLinesOriginal = res;
    })
  }
  sortedBy(key: SorterTimeLine) {
    if (key === SorterTimeLine.Priority){
      if (this.sorterTimeLineStorage.priority){
        this.sorterTimeLineStorage.priority = !this.sorterTimeLineStorage.priority;
        this.timeLines = this.timeLinesOriginal.sort((a, b) => b.priority - a.priority);
      }
      else {
        this.sorterTimeLineStorage.priority = !this.sorterTimeLineStorage.priority;
        this.timeLines = this.timeLinesOriginal.sort((a, b) => a.priority - b.priority);
      }
    }
    else if (key === SorterTimeLine.From){
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
    else if (key === SorterTimeLine.To){
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
    else if (key === SorterTimeLine.TimeConfig){
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
    else if (key === SorterTimeLine.IsOpen){
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
    this.shopService.deleteTimeInterval(timeLine.timeLineId).subscribe(res=>
    this.getTimeLines()
    );
  }

  protected readonly TimeConfigValue = TimeConfigValue;
  protected readonly TimeLine = TimeLine;
  protected readonly SorterTimeLine = SorterTimeLine;

}
export class SorterTimeLineStorage{
  public from: boolean ;
  public to: boolean;
  public priority: boolean;
  public timeConfig: boolean;
  public isOpen: boolean = false;
}
