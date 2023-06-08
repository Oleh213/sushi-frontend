import {AfterViewInit, Component} from '@angular/core';
import {MapService} from "../../services/map.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements AfterViewInit{
  constructor(private mapService: MapService,
              private titleService:Title,
) {
  this.titleService.setTitle("Контакти");
}
  ngAfterViewInit(): void {
    this.mapService.mainPage();
  }

}
