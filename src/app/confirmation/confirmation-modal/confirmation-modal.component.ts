import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {ToastStatus} from "../../toast-notofication/toast.service";
import {ConfirmationService, ConfirmModalOptions} from "../confirmation.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnDestroy{
  public modalOptions: ConfirmModalOptions = new ConfirmModalOptions();
  private subscriptions = new Subscription();

  constructor(private confirmationService: ConfirmationService) {
    this.subscriptions.add(this.confirmationService.modalOptionsSubject.subscribe(res=> {
      this.modalOptions = res;
    })
    )
  }
  confirm(): void {
    this.confirmationService.closeModal(true);
  }
  cancel(): void {
    this.confirmationService.closeModal(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  protected readonly close = close;
}
