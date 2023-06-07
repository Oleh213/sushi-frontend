import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PromoCode} from "../../../app/models/promoCode";
import {ShopService} from "../../../app/services/shop.service";
import {ToastService, ToastStatus} from "../../../app/toast-notofication/toast.service";
import {PromoCodeModalOption} from "../../models/promoCodeOptions";

@Component({
  selector: 'app-add-promo-code-modal',
  templateUrl: './add-promo-code-modal.component.html',
  styleUrls: ['./add-promo-code-modal.component.scss']
})
export class AddPromoCodeModalComponent {
  @Output() close = new EventEmitter<void>()
  @Output() updatePromoCodes = new EventEmitter<void>()
  @Input() promoCode: PromoCode = new PromoCode();
  @Input() promoCodeModalOptions: PromoCodeModalOption;
  constructor(private shop: ShopService,
              private toastService: ToastService,) {
  }
  public detectBrowserName(): string {
    return this.shop.detectBrowserName()
  }

  submit(){
    if (this.checkSubmit()){
      if (this.promoCodeModalOptions === PromoCodeModalOption.AddModal){
        this.addPromoCode();
      }
      else if(this.promoCodeModalOptions === PromoCodeModalOption.EditModal){
        this.editPromoCode();
      }
    }
  }
  checkSubmit():boolean{
    if (!this.promoCode.code || this.promoCode.code.length < 1) {
      this.toastService.showToast("Помилка", "Ведіть код", ToastStatus.Fail);
      return false;
    }
    if (this.promoCode.discount === null || this.promoCode.discount === undefined || this.promoCode.discount <= 0) {
      this.toastService.showToast("Помилка", "Ведіть знижку", ToastStatus.Fail);
      return false;
    }
    if (this.promoCode.count === null || this.promoCode.count === undefined || this.promoCode.count <= 0) {
      this.toastService.showToast("Помилка", "Ведіть кількість", ToastStatus.Fail);
      return false;
    }
    return true;
  }
  addPromoCode(){
    this.shop.addNewPromo(this.promoCode).subscribe(res=> {
      this.toastService.showToast('Успішно!','Промокод додано!', ToastStatus.Success)
      this.updatePromoCodes.emit();
      this.close.emit();
    },error => {
      this.toastService.showToast('Провал!',error.error.errorMessage, ToastStatus.Fail)
    })
  }

  editPromoCode(){
    this.shop.editPromoCode(this.promoCode).subscribe(res=>{
      this.toastService.showToast('Успішно!','Промокод зміненно!', ToastStatus.Success)
      this.updatePromoCodes.emit();
      this.close.emit();
    })
  }

  protected readonly PromoCodeModalOption = PromoCodeModalOption;
}
