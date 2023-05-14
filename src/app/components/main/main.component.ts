import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ImagesSlider} from "../../models/imagesSlider";
import {ShopService} from "../../services/shop.service";
import {Router} from "@angular/router";
import {ErrorHandlerService} from "../../errorHandler/errorHandler";
import {MapService} from "../../services/map.service";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit{
  public isShow = false;
  public imageSlider: Array<ImagesSlider> = [];
  @ViewChild('mapContainer', {static: false}) gmap!: ElementRef;

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

  }

  ngAfterViewInit(): void {
    this.mapService.mainPage();
  }

}
