import {Component, OnInit} from '@angular/core';
import {ShopService} from "../../../app/services/shop.service";
import {ImagesSlider} from "../../../app/models/imagesSlider";
import {SliderModal} from "../../modals/slider-image-modal/slider-image-modal.component";
import {Subscription} from "rxjs";
import {ToastStatus} from "../../../app/toast-notofication/toast.service";
import {ConfirmationService} from "../../../app/confirmation/confirmation.service";

@Component({
  selector: 'app-admin-sliders',
  templateUrl: './admin-sliders.component.html',
  styleUrls: ['./admin-sliders.component.scss']
})
export class AdminSlidersComponent implements OnInit{
  public sliders: ImagesSlider[]=[];
  public modalShow: boolean = false;
  public selectedImage: ImagesSlider = new ImagesSlider();
  public modalType: SliderModal;
  private subscriptions: Subscription[]=[];

  constructor(private shopService: ShopService,
              ) {
  }
  ngOnInit(): void {
    this.sliderRequest();
  }
  openModalAdd(){
    this.selectedImage = new ImagesSlider();
    this.modalShow = true;
    this.modalType = SliderModal.Add;
  }
  openModalUpdate(image: ImagesSlider){
    this.selectedImage = image;
    this.modalShow = true;
    this.modalType = SliderModal.Update;
  }
  sliderRequest(){
    this.subscriptions.push(this.shopService.getImagesSlider().subscribe(res=>{
      this.sliders = res
    }));
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(x=> x.unsubscribe());
  }
}
