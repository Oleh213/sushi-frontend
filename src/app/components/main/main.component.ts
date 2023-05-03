import {Component, OnInit} from '@angular/core';
import {ImagesSlider} from "../../models/imagesSlider";
import {ShopService} from "../../services/shop.service";
import {Router} from "@angular/router";
import {ErrorHandlerService} from "../../errorHandler/errorHandler";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  public currentIndex: number = 0;
  public timeoutId: number = 0;
  public isShow = false;
  public imageSlider: Array<ImagesSlider> = [];
  private map!: google.maps.Map


  constructor(private shop: ShopService,
              public router: Router,
              private errorService: ErrorHandlerService
  ) {
  }
  ngOnInit() {
    this.shop.getImagesSlider().subscribe(res=> {
      this.imageSlider = res;
      this.isShow = true;
    },
      error => {
      this.errorService.handleError(error);
      })
    this.resetTimer();
  }

  choseLocation(event: any){


    const mark1 = {
      lat: 43.225617855222204,
      lng: 28.44943960380496,
    }

    var newMarker = new google.maps.Marker({
      draggable: true,
      position: new google.maps.LatLng(mark1),
      map: this.map,
      title: "Your location"
    });

    console.log(newMarker)

  }

  resetTimer() {
    for(let i of this.imageSlider){
      setTimeout(() => this.goToNext(), 5000);
    }
  }

  goToPrevious(): void {
    const isFirstSlide = this.currentIndex === 0;
    this.currentIndex = isFirstSlide
      ? this.imageSlider.length - 1
      : this.currentIndex - 1;
  }

  goToNext(): void {
    const isLastSlide = this.currentIndex === this.imageSlider.length - 1;
    this.currentIndex = isLastSlide ? 0 : this.currentIndex + 1;
  }

  getCurrentSlideUrl() {
    if(this.imageSlider.length > 0){
      return `${this.imageSlider[this.currentIndex]?.image}`;
    }
    else return '';
  }

}
