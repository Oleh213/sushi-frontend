import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../app/models/product";
import {ShopService} from "../../../app/services/shop.service";
import {ToastService, ToastStatus} from "../../../app/toast-notofication/toast.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add-discount-modal',
  templateUrl: './add-discount-modal.component.html',
  styleUrls: ['./add-discount-modal.component.scss']
})
export class AddDiscountModalComponent implements OnInit{
  @Output() close = new EventEmitter<void>();
  @Output() updateProduct = new EventEmitter<void>();
  @Input() product: Product = new Product();
  private subscriptions: Subscription[]=[];
  constructor(private shop: ShopService,
              private toastService: ToastService,
              ) {
  }
  ngOnInit(): void {
  }
  public detectBrowserName(): string {
    return this.shop.detectBrowserName()
  }
  public clearDiscount() {
    if (this.product !== null){
      this.shop.clearDiscount(this.product.productId.toString()).subscribe(res=>{
        this.toastService.showToast("Успішно", "Знижку видалено!", ToastStatus.Success)
        this.updateProduct.emit();
        this.close.emit();
      })
    }
  }

  applyDiscount() {
    if(this.product !== null && this.product.discount > 0){
      this.shop.applyDiscount(this.product.productId.toString(), this.product.discount).subscribe(res=> {
        this.toastService.showToast("Успішно", "Знижку застосовано", ToastStatus.Success)
        this.updateProduct.emit();
        this.close.emit();
        }
      )
    }
    else {
      this.toastService.showToast("Помилка", "Ведіть знижку", ToastStatus.Fail)
    }
  }
}
