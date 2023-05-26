import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TimeConfig, TimeConfigValue, TimeLine, TimeLineModalOption} from "../../models/timeLine";
import {ShopService} from "../../../app/services/shop.service";
import {ToastService, ToastStatus} from "../../../app/toast-notofication/toast.service";

@Component({
  selector: 'app-work-time-edit-modal',
  templateUrl: './work-time-edit-modal.component.html',
  styleUrls: ['./work-time-edit-modal.component.scss']
})
export class WorkTimeEditModalComponent implements OnInit{
  @Output() close = new EventEmitter<void>()
  @Output() updateTimeLine = new EventEmitter<void>()
  @Input() timeLine: TimeLine = new TimeLine();
  @Input() timeLineModalOptions: TimeLineModalOption;

  public selectedCategory: string = '';
  public timeConfig:Array<{key: TimeConfig, value: string }>  = [
    { key: TimeConfig.Repeat, value: 'Повторювати'},
    { key: TimeConfig.Once, value: 'Один раз' },
  ]
  constructor(private shop: ShopService,
              private toastService: ToastService,
  ) {
  }
  ngOnInit(): void {
    this.selectedCategory = TimeConfigValue[this.timeLine.timeConfig].value;
  }
  detectBrowserName(): string {
    return this.shop.detectBrowserName()
  }

  checkSubmit(): boolean{
    if(this.selectedCategory === TimeConfigValue[0].value){
      this.timeLine.timeConfig = TimeConfig.Repeat;
    }
    else if(this.selectedCategory === TimeConfigValue[0].value){
      this.timeLine.timeConfig = TimeConfig.Once;
    }
    if(this.timeLine.isOpen === null){
      this.toastService.showToast("Помилка", "Ведіть статус", ToastStatus.Fail)
      return false;
    }
    if(this.timeLine.to === null){
      this.toastService.showToast("Помилка", "Ведіть кінець тайм лайну", ToastStatus.Fail)
      return false;
    }
    if(this.timeLine.from === null){
      this.toastService.showToast("Помилка", "Ведіть початок тайм лайну", ToastStatus.Fail)
      return false;
    }
    if(this.timeLine.priority === null){
      this.toastService.showToast("Помилка", "Ведіть доступку кількість", ToastStatus.Fail)
      return false;
    }
    if(this.timeLine.note === null || this.timeLine.note.length < 0){
      this.toastService.showToast("Помилка", "Ведіть занотовку", ToastStatus.Fail)
      return false;
    }
    if(this.timeLine.timeConfig === null){
      this.toastService.showToast("Помилка", "Ведіть повтори", ToastStatus.Fail)
      return false;
    }
    else {
      return true;
    }
  }

  submit(){
    if(this.checkSubmit()){
      if(this.timeLineModalOptions === TimeLineModalOption.EditTimeLine){
        this.editTimeInterval();
      }
      else if(this.timeLineModalOptions === TimeLineModalOption.AddTimeLine){
        this.addTimeInterval();
      }
    }
  }
  editTimeInterval(){
    this.shop.editTimeInterval(this.timeLine).subscribe(res=> {
      this.close.emit();
      this.updateTimeLine.emit();
      this.toastService.showToast("Успішно!", "Дані змінено", ToastStatus.Success)
    })
  }
  addTimeInterval(){
    this.shop.addTimeInterval(this.timeLine).subscribe(res=> {
      this.close.emit();
      this.updateTimeLine.emit();
      this.toastService.showToast("Успішно!", "Інтервал додано", ToastStatus.Success)
    })
  }

  defaultSelect():string{
    return TimeConfigValue[this.timeLine.timeConfig].value;
  }

  protected readonly TimeConfig = TimeConfig;
  protected readonly TimeConfigValue = TimeConfigValue;
  protected readonly TimeLineModalOption = TimeLineModalOption;
}
