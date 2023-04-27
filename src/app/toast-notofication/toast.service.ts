import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

interface ToastMessage {
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public onToastOpened$: Subject<ToastMessage> = new Subject<ToastMessage>();
  public isShown: boolean = false;
  constructor() { }

  public showToast(title: string, message: string){
    if(!this.isShown){
      this.onToastOpened$.next({
        title,
        message
      });
      this.isShown = true;
      setTimeout(() => {
        this.isShown = false;
      }, 5000);
    }
  }

}
