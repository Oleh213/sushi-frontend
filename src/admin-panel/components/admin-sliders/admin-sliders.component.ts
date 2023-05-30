import {Component, OnInit} from '@angular/core';
import {ShopService} from "../../../app/services/shop.service";
import {ImagesSlider} from "../../../app/models/imagesSlider";
import {SliderModal} from "../../modals/slider-image-modal/slider-image-modal.component";

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
  constructor(private shopService: ShopService) {
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
    this.shopService.getImagesSlider().subscribe(res=>{
      this.sliders = res
    })
  }
}
