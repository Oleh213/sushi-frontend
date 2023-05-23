import {Component, EventEmitter, Output} from '@angular/core';
import {AddNewProduct} from "../../models/addNewProduct";
import {ShopService} from "../../../app/services/shop.service";
import {ToastService, ToastStatus} from "../../../app/toast-notofication/toast.service";
import {Category} from "../../../app/models/category";
import {ProductOption} from "../../models/productOption";

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss']
})
export class AddProductModalComponent {
  @Output() close = new EventEmitter<void>()
  @Output() updateProduct = new EventEmitter<void>()
  public newProduct: AddNewProduct = new AddNewProduct();
  public categories: Category[] = [];
  public productOptions: ProductOption[] = [];
  public imageSrc: string | ArrayBuffer | null = '';
  public uploadedImage: File;
  constructor(private shop: ShopService,
              private toastService: ToastService,
              ) {
  }
  ngOnInit(): void {
    this.shop.getCategory().subscribe(res=>{
      this.categories = res
    })
    this.shop.getProductOptions().subscribe(res=>{
      this.productOptions = res;
    })
  }
  detectBrowserName(): string {
    return this.shop.detectBrowserName()
  }

  checkSubmit(): boolean{

    if(this.newProduct.productName.length < 1){
      this.toastService.showToast("Помилка", "Ведіть ім'я", ToastStatus.Fail)
      return false;
    }
    if(this.newProduct.categoryName.length < 1){
      this.toastService.showToast("Помилка", "Ведіть категорію", ToastStatus.Fail)
      return false;
    }
    if(this.newProduct.weight === null){
      this.toastService.showToast("Помилка", "Ведіть вагу", ToastStatus.Fail)
      return false;
    }
    if(this.newProduct.available === null){
      this.toastService.showToast("Помилка", "Ведіть доступку кількість", ToastStatus.Fail)
      return false;
    }
    if(this.newProduct.price === null){
      this.toastService.showToast("Помилка", "Ведіть ціну", ToastStatus.Fail)
      return false;
    }
    else {
      return true;
    }
  }

  submit(file: File){
    if(this.checkSubmit()){
      const formData = new FormData();
      formData.append('file', file)
      formData.append('price',this.newProduct.price.toString());
      formData.append('productName',this.newProduct.productName);
      formData.append('description','None');
      formData.append('available',this.newProduct.available.toString());
      formData.append('weight',this.newProduct.weight.toString());
      formData.append('productOptionName',this.newProduct.productOptionName);
      formData.append('categoryName',this.newProduct.categoryName);
      this.shop.addNewProduct(formData).subscribe(res=> {
          this.toastService.showToast("Успішно!", "Продукт добавлено", ToastStatus.Success);
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
