import {Component, OnDestroy, OnInit} from '@angular/core';
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
  isShow = false;
  public imageSlider: Array<ImagesSlider> = [];
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
