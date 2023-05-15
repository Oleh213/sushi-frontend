import {AfterViewInit, Component} from '@angular/core';
import {MapService} from "../../services/map.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements AfterViewInit{
  constructor(private mapService: MapService) {
  }
  ngAfterViewInit(): void {
    this.mapService.mainPage();
  }

}
