import {Component, OnInit} from '@angular/core';
import {ImagesSlider} from "../../models/imagesSlider";
import {ShopService} from "../../services/shop.service";
import {Router} from "@angular/router";
import {ErrorHandlerService} from "../../errorHandler/errorHandler";
import {MapService} from "../../services/map.service";
import {MapsAPILoader} from "@agm/core";
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";

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
  public zoom = 14;
  bounds :any;
  showNavigationArrows = false;
  showNavigationIndicators = false;
  images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private shop: ShopService,
              public router: Router,
              private errorService: ErrorHandlerService,
              public mapService: MapService,
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

    this.mapService.mainPage();
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
