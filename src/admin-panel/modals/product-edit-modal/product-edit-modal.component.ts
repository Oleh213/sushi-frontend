import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Product} from "../../../app/models/product";
import {Category} from "../../../app/models/category";
import {ShopService} from "../../../app/services/shop.service";
import {ProductOption} from "../../models/productOption";
import {ToastService, ToastStatus} from "../../../app/toast-notofication/toast.service";
import {EditProduct} from "../../models/editProduct";

@Component({
  selector: 'app-product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.scss']
})
export class ProductEditModalComponent implements OnInit{
  @Output() close = new EventEmitter<void>()
  @Output() updateProduct = new EventEmitter<void>()
  @Input() product: Product = new Product();
  public categories: Category[] = [];
  public productOptions: ProductOption[] = [];
  public imageSrc: string | ArrayBuffer | null = '';
  public uploadedImage: File;
  public editProduct: EditProduct = new EditProduct();
  public productOptionName: string = 'Не вказано';
  constructor(private shop: ShopService,
              public toastService: ToastService,
  ) {
  }
  ngOnInit(): void {
    this.editProduct = this.shop.transferProductData(this.product);
    this.shop.getCategory().subscribe(res=>{
      this.categories = res
    })
    this.shop.getProductOptions().subscribe(res=>{
      this.productOptions = res;
    })
    this.imageSrc = this.product.image;
    if(this.product.productOption){
      this.productOptionName = this.product.productOption.name;
    }
  }
  detectBrowserName(): string {
    return this.shop.detectBrowserName()
  }
  checkSubmit(): boolean{
    if(this.product.productName.length < 1){
      this.toastService.showToast("Помилка", "Ведіть ім'я", ToastStatus.Fail)
      return false;
    }
    if(this.product.categoryName.length < 1){
      this.toastService.showToast("Помилка", "Ведіть категорію", ToastStatus.Fail)
      return false;
    }
    if(this.product.weight === null){
      this.toastService.showToast("Помилка", "Ведіть вагу", ToastStatus.Fail)
      return false;
    }
    if(this.product.available === null){
      this.toastService.showToast("Помилка", "Ведіть доступку кількість", ToastStatus.Fail)
      return false;
    }
    if(this.product.discount === null){
      this.toastService.showToast("Помилка", "Ведіть знижку", ToastStatus.Fail)
      return false;
    }
    if(this.product.price === null){
      this.toastService.showToast("Помилка", "Ведіть ціну", ToastStatus.Fail)
      return false;
    }
    else {
      return true;
    }
  }

  submit(file: File){
    if(this.checkSubmit()){
      this.editProduct = this.shop.transferProductData(this.product);
      const formData = new FormData();
      formData.append('file', file)
      formData.append('price',this.editProduct.price.toString());
      formData.append('productId',this.editProduct.productId.toString());
      formData.append('productName',this.editProduct.productName);
      formData.append('description',this.editProduct.description);
      formData.append('available',this.editProduct.available.toString());
      formData.append('weight',this.editProduct.weight.toString());
      formData.append('productOptionName',this.productOptionName);
      formData.append('categoryName',this.editProduct.categoryName);
      this.shop.updateProduct(formData).subscribe(res=> {
        this.toastService.showToast("Успішно!", "Дані оновлено", ToastStatus.Success);
        this.updateProduct.emit();
        this.close.emit();
        }
      )
    }
  }

  readURL(event: any): void {
    this.uploadedImage = event.target.files[0];
    if (event!.target!.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    }
  }
}
