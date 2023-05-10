import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AddressDetails, MapService} from "../../../services/map.service";

@Component({
  selector: 'app-chose-address',
  templateUrl: './chose-address.component.html',
  styleUrls: ['./chose-address.component.scss']
})
export class ChoseAddressComponent {
  @Output() close = new EventEmitter<void>()
  @Input() addresses: AddressDetails[] = [];

  constructor(private mapService: MapService) {
  }

  changePosition(lat: number, lng: number, address:google.maps.GeocoderAddressComponent[]){
    this.mapService.position.lat = lat;
    this.mapService.position.lng = lng;
    this.mapService.checkout();
    this.mapService.selectedAddress = this.transform(address);
    this.close.emit()
  }
  transform(address: google.maps.GeocoderAddressComponent[]): string {
    let street = ''
    let street_number = ''
    let city = ''
    for (let item of address){
      if (item.types.includes('route')){
        street = item.short_name;
      }
      else if (item.types.includes("street_number")){
        street_number = item.short_name;
      }
      else if (item.types.includes("locality" || "political")){
        city = item.short_name;
      }
    }
    return street + ' ' + street_number + ' м.'+ city ;
  }

}
