import {Component, DoCheck, ElementRef, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {ToastService, ToastStatus} from "../toast.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnDestroy {
  public toastMessage: string = '';
  public toastTitle: string = '';
  public isShowSuccess = false;
  public isShowFail = false;
  public isShowProgress: boolean = false;
  private subscriptions = new Subscription();
  constructor(public toastService: ToastService) {
    this.subscriptions.add(
      this.toastService.onToastOpened$.subscribe(({message, title,toastStatus}) => {
        if (!this.isShowSuccess && !this.isShowFail) {
          this.toastMessage = message;
          this.toastTitle = title;
          if (toastStatus === ToastStatus.Fail){
            this.isShowFail = true;
            this.isShowProgress = true;
            setTimeout(() => {
              this.isShowFail = false;
            }, 4500);
          }
          else {
            this.isShowSuccess = true;
            this.isShowProgress = true;
            setTimeout(() => {
              this.isShowSuccess = false;
            }, 4500);
          }
          setTimeout(() => {
            this.isShowProgress = false;
          }, 5000);
        }
      })
    );
  }
  dismiss(): void {
    this.isShowFail = false;
    this.isShowSuccess = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

}
