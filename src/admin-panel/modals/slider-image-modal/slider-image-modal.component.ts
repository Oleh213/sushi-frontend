import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../app/models/product";
import {ImagesSlider} from "../../../app/models/imagesSlider";
import {ShopService} from "../../../app/services/shop.service";

@Component({
  selector: 'app-slider-image-modal',
  templateUrl: './slider-image-modal.component.html',
  styleUrls: ['./slider-image-modal.component.scss']
})
export class SliderImageModalComponent implements OnInit{
  @Output() close = new EventEmitter<void>()
  @Output() update = new EventEmitter<void>()
  @Input() slider: ImagesSlider = new ImagesSlider();
  public imageSrc: string | ArrayBuffer | null = '';
  public uploadedImage: File;
  @Input() sliderType: SliderModal;
  constructor(private shopService: ShopService) {
  }
  ngOnInit(): void {
    this.imageSrc = this.slider.image;
    console.log(this.imageSrc);
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
  updateImageSlider() {
    if(this.uploadedImage != null){
      const formData = new FormData();
      formData.append('file', this.uploadedImage)
      formData.append('imageNumber', this.slider.imageNumber.toString())
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
    this.shopService.deleteImageSlide(this.slider.imageNumber).subscribe(res=> {
      this.close.emit();
      this.update.emit();
    })
  }

  protected readonly SliderModal = SliderModal;
}

export enum SliderModal {
  Update,
  Delete,
  Add,

}
