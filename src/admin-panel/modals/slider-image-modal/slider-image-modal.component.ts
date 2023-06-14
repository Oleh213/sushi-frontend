import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ImagesSlider} from "../../../app/models/imagesSlider";
import {ShopService} from "../../../app/services/shop.service";
import {ToastService, ToastStatus} from "../../../app/toast-notofication/toast.service";
import {Subscription} from "rxjs";
import {ConfirmationService} from "../../../app/confirmation/confirmation.service";

@Component({
  selector: 'app-slider-image-modal',
  templateUrl: './slider-image-modal.component.html',
  styleUrls: ['./slider-image-modal.component.scss']
})
export class SliderImageModalComponent implements OnInit, OnDestroy{
  @Output() close = new EventEmitter<void>()
  @Output() update = new EventEmitter<void>()
  @Input() slider: ImagesSlider = new ImagesSlider();
  public imageSrc: string | ArrayBuffer | null = '';
  public uploadedImage: File;
  @Input() sliderType: SliderModal;
  private subscriptions: Subscription[]= [];
  public imagesSlider: ImagesSlider = new ImagesSlider();
  constructor(private shopService: ShopService,
              private confirmService: ConfirmationService,
              private toastService: ToastService,
              ) {
  }
  ngOnInit(): void {
    let data = this.slider;
    this.imageSrc = this.slider.image;
    this.imagesSlider = data;
    this.subscriptions.push(this.confirmService.getResult().subscribe(result => {
      if(result){
        this.shopService.deleteImageSlide(this.slider.imageNumber).subscribe(res=> {
          this.close.emit();
          this.update.emit();
          this.toastService.showToast('Успішно!','Слайд видалено!', ToastStatus.Success)
        })
      }
    }));
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
  submit(){
    if(this.sliderType === SliderModal.Add){
      this.addImageSlider();
    }
    else if(this.sliderType === SliderModal.Update){
      this.updateImageSlider();
    }
  }
  detectBrowserName(): string {
    return this.shopService.detectBrowserName()
  }
  updateImageSlider() {
    if(this.imagesSlider.imageNumber > 0){
      console.log(this.imagesSlider.imagesSliderId.toString())
      const formData = new FormData();
      formData.append('file', this.uploadedImage);
      formData.append('imageNumber', this.imagesSlider.imageNumber.toString());
      formData.append('description', this.imagesSlider.description);
      formData.append('imageSliderId', this.imagesSlider.imagesSliderId.toString());
      this.shopService.editImageSlide(formData).subscribe(res=> {
        this.close.emit();
        this.update.emit();
      })
    }
  }
  addImageSlider() {
    if(this.uploadedImage != null){
      const formData = new FormData();
      formData.append('file', this.uploadedImage)
      this.shopService.addImageSlide(formData).subscribe(res=> {
        this.close.emit();
        this.update.emit();
      })
    }
  }
  deleteImageSlider() {
    this.confirmService.openModal('Видалити даний сайд');
  }

  protected readonly SliderModal = SliderModal;

  ngOnDestroy(): void {
    this.subscriptions.forEach(x=> x.unsubscribe());
  }
}

export enum SliderModal {
  Update,
  Delete,
  Add,

}
