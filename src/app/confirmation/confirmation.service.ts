import {Injectable, OnDestroy} from '@angular/core';
import {Observable, Subject, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService implements OnDestroy{

  constructor() { }

  public modalOptionsSubject: Subject<ConfirmModalOptions> = new Subject<ConfirmModalOptions>();
  public resultSubject: Subject<boolean> = new Subject<boolean>();
  openModal(message:string): void {
    this.modalOptionsSubject.next(new ConfirmModalOptions(true,message));
  }
  closeModal(result: boolean): void {
    this.modalOptionsSubject.next(new ConfirmModalOptions(false));
    this.resultSubject.next(result);
  }
  getResult(): Observable<boolean> {
    return this.resultSubject.asObservable();
  }

  ngOnDestroy(): void {
  }
}
export class ConfirmModalOptions{
  constructor(isOpen?: boolean, message?: string) {
    this.isOpen = isOpen; this.message = message;
  }
  public isOpen?: boolean = false;
  public message?: string = '';
}
