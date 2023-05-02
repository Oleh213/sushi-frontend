import {Component, OnDestroy, OnInit} from '@angular/core';
import {ImagesSlider} from "../../models/imagesSlider";
import {ShopService} from "../../services/shop.service";
import {Router} from "@angular/router";
import {ErrorHandlerService} from "../../errorHandler/errorHandler";
import {Loader} from "@googlemaps/js-api-loader";

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


    let loader = new Loader({
      apiKey: "AIzaSyD8P7aI-oFKaTrztM6Mm4yqB6a0DiyWFys",
    });
    loader.load().then()

    const location = {
      lat: 49.232830,
      lng: 28.466553,
    }
    this.map = new google.maps.Map(document.getElementById('map')!,{
      center:location,
      zoom:12,
    })
    const mark1 = {
      lat: 49.225617855222204,
      lng: 28.44943960380496,
    }
    const market = new google.maps.Marker({
      position: mark1,
      map: this.map,
      cursor: "Umami Sushi",
      title: "Umami Sushi",
    })
  }
  resetTimer() {
    for(let i of this.imageSlider){
      setTimeout(() => this.goToNext(), 5000);
    }
  }

  goToPrevious(): void {
    const isFirstSlide = this.currentIndex === 0;
    const newIndex = isFirstSlide
      ? this.imageSlider.length - 1
      : this.currentIndex - 1;
    this.currentIndex = newIndex;
  }

  goToNext(): void {
    const isLastSlide = this.currentIndex === this.imageSlider.length - 1;
    const newIndex = isLastSlide ? 0 : this.currentIndex + 1;
    this.currentIndex = newIndex;
  }

  getCurrentSlideUrl() {
    if(this.imageSlider.length > 0){
      return `${this.imageSlider[this.currentIndex]?.image}`;
    }
    else return '';
  }

}
