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

    this.marketFunction();

  }

  marketFunction(){
    const location = {
      lat: 49.225617855222204,
      lng: 28.44943960380496,
    }
    this.map = new google.maps.Map(document.getElementById('map')!,{
      center:location,
      zoom:14,
    })
    const mark1 = {
      lat: 49.225617855222204,
      lng: 28.44943960380496,
    }
    const marker = new google.maps.Marker({
      position: mark1,
      map: this.map,
    })
    const infowindow = new google.maps.InfoWindow({
      content: "Umami Sushi",

    });
    marker.addListener("mouseover", () => {
      infowindow.open({
        anchor: marker,
        map: this.map,
      });
    });

    marker.addListener("mouseout", () => {
      infowindow.close();
    });
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
