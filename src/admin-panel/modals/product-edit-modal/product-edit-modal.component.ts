import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Product} from "../../../app/models/product";
import {Category} from "../../../app/models/category";
import {ShopService} from "../../../app/services/shop.service";
import {ProductOption} from "../../models/productOption";
import {ToastService, ToastStatus} from "../../../app/toast-notofication/toast.service";
import {EditProduct} from "../../models/editProduct";
import {Guid} from "guid-typescript";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.scss']
})
export class ProductEditModalComponent implements OnInit{
  @Output() close = new EventEmitter<void>()
  @Output() updateProduct = new EventEmitter<void>()
  @Input() productId: Guid = Guid.createEmpty();
  public categories: Category[] = [];
  public productOptions: ProductOption[] = [];
  public imageSrc: string | ArrayBuffer | null = '';
  public uploadedImage: File;
  public product: Product = new Product();
  public editProduct: EditProduct = new EditProduct();
  public productOptionName: string = 'Не вказано';
  public productItems: boolean = false;
  public searchTerm: string = '';
  public products: Product[] = [];
  public modal: boolean = false;
  public sortedProducts: Product[] = [];
  constructor(private shopService: ShopService,
              public toastService: ToastService,
  ) {
  }
  ngOnInit(): void {
    forkJoin([this.shopService.getProduct(this.productId.toString()), this.shopService.getCategory(), this.shopService.getProductOptions()])
      .subscribe(([product, categories, productOptions]) => {
          this.product = product;
          this.imageSrc = this.product.image;
          if(product.productOption){
            this.productOptionName = product.productOption.name;
          }
          if(product.items !== null && product.items !== undefined && product.items.length>0){
            this.productItems = true;
          }
          this.categories = categories;
          this.productOptions = productOptions;

        },
        error => {
          console.log('error')
        });
    this.editProduct = this.shopService.transferProductData(this.product);
    this.shopService.getProducts().subscribe(res=> {
      this.products = res;
    })
  }
  detectBrowserName(): string {
    return this.shopService.detectBrowserName()
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
  submit(){
    if(this.checkSubmit()){
      this.editProduct = this.shopService.transferProductData(this.product);
      const formData = new FormData();
      formData.append('file', this.uploadedImage)
      formData.append('price',this.editProduct.price.toString());
      formData.append('productId',this.editProduct.productId.toString());
      formData.append('productName',this.editProduct.productName);
      formData.append('description',this.editProduct.description);
      formData.append('available',this.editProduct.available.toString());
      formData.append('weight',this.editProduct.weight.toString());
      formData.append('productOptionName',this.productOptionName);
      formData.append('categoryName',this.editProduct.categoryName);
      this.shopService.updateProduct(formData).subscribe(res=> {
        this.toastService.showToast("Успішно!", "Дані оновлено", ToastStatus.Success);
        this.updateProduct.emit();
        this.close.emit();
        }
      )
    }
  }
  checkShowProductItems(event: any){
    this.productItems = event.target.checked;
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
  onSearchTermChange(){
    this.sortedProducts = this.products.filter(x=> x.productName.toLowerCase().includes(this.searchTerm.toLowerCase()));
    this.modal = this.searchTerm.length > 0 && this.sortedProducts.length > 0;
  }
  addItemToProducts(productId: Guid){
    this.searchTerm = '';
    let product = this.products.find(x=> x.productId === productId)!;
    if(this.product.items !== undefined && this.product.items !== null){
      this.product.items.push(product);
    }
    else {
      const products: Product[] = [];
      products.push(product);
      this.product.items = products;

    }
  }

  removeItem(itemId: string){
    this.shopService.dellItemFromProduct(this.productId.toString(),itemId,).subscribe(res=> {
      this.product.items = this.product.items!.filter(x=> x.productId.toString() !== itemId)!;
    })
  }


}
