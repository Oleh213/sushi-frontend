import {Component, DoCheck, ElementRef, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {ToastService} from "../toast.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnDestroy {
  public toastMessage: string = '';
  public toastTitle: string = '';
  public isShow = false;
  public isShowProgress: boolean = false;
  private subscriptions = new Subscription();
  constructor(private el: ElementRef, public toastService: ToastService) {
    this.subscriptions.add(
      this.toastService.onToastOpened$.subscribe(({message, title}) => {
        if (!this.isShow) {
          this.toastMessage = message;
          this.toastTitle = title;
          this.isShow = true;
          this.isShowProgress = true;
          setTimeout(() => {
            this.isShow = false;
          }, 4500);
          setTimeout(() => {
            this.isShowProgress = false;
          }, 5000);
        }
      })
    );
  }
  dismiss(): void {
    this.isShow = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

}
