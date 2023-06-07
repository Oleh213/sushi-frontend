import {Component, OnDestroy, OnInit} from '@angular/core';
import {PromoCode} from "../../../app/models/promoCode";
import {ShopService} from "../../../app/services/shop.service";
import {PromoCodeModalOption, SorterPromoCode, SorterPromoCodeType} from "../../models/promoCodeOptions";
import {ToastService, ToastStatus} from "../../../app/toast-notofication/toast.service";
import {ConfirmationService} from "../../../app/confirmation/confirmation.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-admin-promo-codes-options',
  templateUrl: './admin-promo-codes-options.component.html',
  styleUrls: ['./admin-promo-codes-options.component.scss']
})
export class AdminPromoCodesOptionsComponent implements OnInit, OnDestroy {
  public modalShow: boolean = false;
  public sorterPromoCode: SorterPromoCode = new SorterPromoCode()
  public promoCodeModal: PromoCodeModalOption;
  public promoCodes: PromoCode[] = [];
  public promoCodesOriginal: PromoCode[] = [];
  public selectedPromo: PromoCode = new PromoCode();
  public confirm: boolean = false;
  private subscriptions: Subscription[]=[];
  constructor(private shopService: ShopService,
              private toastService: ToastService,
              private confirmService: ConfirmationService,
              )
  {}

  ngOnInit(): void {
    this.getPromoCodes();
    this.subscriptions.push(this.confirmService.getResult().subscribe(result => {
      if(result){
        this.shopService.deletePromoCode(this.selectedPromo.promocodetId).subscribe(res=>{
            this.getPromoCodes()
            this.toastService.showToast('Успішно!','Промокод видалено!', ToastStatus.Success)
          }
        );
      }
    }));
  }
  getPromoCodes() {
    this.subscriptions.push(this.shopService.getPromoCodes().subscribe(res => {
      this.promoCodes = res.data!;
      this.promoCodesOriginal = res.data!;
    }));
  }
  sortedBy(key: SorterPromoCodeType) {
    if (key === SorterPromoCodeType.Count){
      if (this.sorterPromoCode.count){
        this.sorterPromoCode.count = !this.sorterPromoCode.count;
        this.promoCodes = this.promoCodesOriginal.sort((a, b) => a.count - b.count);
      }
      else {
        this.sorterPromoCode.count = !this.sorterPromoCode.count;
        this.promoCodes = this.promoCodesOriginal.sort((a, b) => b.count - a.count);
      }
    }
    else if (key === SorterPromoCodeType.Discount){
      if (this.sorterPromoCode.discount){
        this.sorterPromoCode.discount = !this.sorterPromoCode.discount;
        this.promoCodes = this.promoCodesOriginal.sort((a, b) => a.discount - b.discount);
      }
      else {
        this.sorterPromoCode.discount = !this.sorterPromoCode.discount;
        this.promoCodes = this.promoCodesOriginal.sort((a, b) => b.discount - a.discount);
      }
    }
  }
  openModalEdit(promo: PromoCode){
    this.selectedPromo = promo;
    this.promoCodeModal = PromoCodeModalOption.EditModal;
    this.modalShow = true;
  }
  openModalAdd(){
    this.selectedPromo = new PromoCode();
    this.promoCodeModal = PromoCodeModalOption.AddModal;
    this.modalShow = true;
  }
   deletePromo(promo: PromoCode){
    this.selectedPromo = promo;
    this.confirmService.openModal(`Ви точно хочете видалити промокод? (${this.selectedPromo.code})`);
  }
  protected readonly SorterPromoCodeType = SorterPromoCodeType;

  ngOnDestroy(): void {
    this.subscriptions.forEach(x=> x.unsubscribe());
  }
}
