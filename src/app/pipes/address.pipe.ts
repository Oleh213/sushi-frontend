import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

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
    return street + ' ' + street_number + '  м. '+ city ;
  }

}
