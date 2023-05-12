import {Injectable} from '@angular/core';
import {MouseEvent} from "@agm/core/services/google-maps-types";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map!: google.maps.Map
  public selectedAddress: string = '';
  public position: { lat: number, lng: number} ={ lat: 49.225617855222204, lng: 28.44943960380496};
  public geocoder = new google.maps.Geocoder();
  private addresses:AddressDetails[] =[];
  constructor() {
  }
  searchAddress(options: string) :  Observable<AddressDetails[]> {
    this.addresses = [];
    var geocoderRequest = { address: options};
    this.geocoder.geocode(geocoderRequest, (results, status) => {
      if(results){
        for (let item of results){
          if(this.checkCity(item)){
            let addressDetails = new AddressDetails();
            addressDetails.address = item.address_components;
            addressDetails.coordinates = item.geometry;
            this.addresses.push(addressDetails);
          }
        }
      }
    });
    let ob = Observable.create((observer: any)=> {
      observer.next(this.addresses);
    });
    return ob ;
  }

  checkCity(items : google.maps.GeocoderResult): boolean{
    for(let item of items.address_components) {
      if (item.types.includes("administrative_area_level_1" || "political") && item.short_name.includes("Вінницька область")){
        return true;
      }
    }
    return false;
  }


  checkout() {
    this.map = new google.maps.Map(document.getElementById('map')!, {
      center: this.position,
      zoom: 14,
    })

    const triangleCoords: google.maps.LatLngLiteral[] = [
      {lat: 49.2602083, lng: 28.3994724},
      {lat: 49.2575195, lng: 28.3675434},
      {lat: 49.2429526, lng: 28.3651401},
      {lat: 49.2272603, lng: 28.3812763},
      {lat: 49.2227759, lng: 28.3634235},
      {lat: 49.2050585, lng: 28.3675434},
      {lat: 49.1956365, lng: 28.3627368},
      {lat: 49.1893542, lng: 28.3510639},
      {lat: 49.1743183, lng: 28.3514072},
      {lat: 49.170278, lng: 28.3610202},
      {lat: 49.170278, lng: 28.3774997},
      {lat: 49.1738694, lng: 28.3932926},
      {lat: 49.1823979, lng: 28.3919193},
      {lat: 49.2028153, lng: 28.4083988},
      {lat: 49.1855396, lng: 28.4121753},
      {lat: 49.1841932, lng: 28.4296848},
      {lat: 49.185764, lng: 28.4509708},
      {lat: 49.1873347, lng: 28.4815265},
      {lat: 49.1990017, lng: 28.4760333},
      {lat: 49.2039369, lng: 28.4918262},
      {lat: 49.2050585, lng: 28.5148288},
      {lat: 49.1981044, lng: 28.5440113},
      {lat: 49.1951878, lng: 28.5659839},
      {lat: 49.2014694, lng: 28.5786869},
      {lat: 49.2149272, lng: 28.5797168},
      {lat: 49.2317443, lng: 28.563924},
      {lat: 49.2384696, lng: 28.5642673},
      {lat: 49.2449698, lng: 28.5642673},
      {lat: 49.2622248, lng: 28.5635807},
      {lat: 49.2662575, lng: 28.5519077},
      {lat: 49.2808176, lng: 28.5436679},
      {lat: 49.291119, lng: 28.5436679},
      {lat: 49.3041047, lng: 28.518262},
      {lat: 49.3141774, lng: 28.4928562},
      {lat: 49.3177583, lng: 28.4722568},
      {lat: 49.314625, lng: 28.4557773},
      {lat: 49.269842, lng: 28.4468509},
      {lat: 49.2519173, lng: 28.4269382},
      {lat: 49.2539342, lng: 28.4046222},
      {lat: 49.2602083, lng: 28.3994724},
    ];

    const bermudaTriangle = new google.maps.Polygon({
      paths: triangleCoords,
      strokeColor: "#FF0000",
      strokeOpacity: 0.9,
      strokeWeight: 3,
      fillColor: "#4ec412",
      fillOpacity: 0.1,
    });

    bermudaTriangle.setMap(this.map);

    const marker = new google.maps.Marker({
      position: this.position,
      map: this.map,
      icon: "http://maps.google.com/mapfiles/kml/paddle/grn-blank.png",
    })

    bermudaTriangle.addListener("click", (event: MouseEvent) => {
      marker.setPosition(event.latLng.toJSON())
      this.geocodeLatLng(event.latLng.toJSON())
      this.position = event.latLng.toJSON();
    });
  }

   geocodeLatLng(input: any) {
     let geocoderRequest = { location: input };
     this.geocoder.geocode(geocoderRequest, (results, status) => {
       if(results){
         let address = results[0].address_components
         this.selectedAddress = address[1].long_name + ' '  + address[0].long_name + ' м. ' + address[2].long_name;
       }
     });
   }

  mainPage() {
    this.map = new google.maps.Map(document.getElementById('map')!, {
      center: this.position,
      zoom: 14,
    })

    const marker = new google.maps.Marker({
      position: this.position,
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

  orderInfo(lat: number, lng: number){
    const location = {
      lat: lat,
      lng: lng,
    }
    this.map = new google.maps.Map(document.getElementById('map')!, {
      center: location,
      zoom: 14,
    })
    const marker = new google.maps.Marker({
      position: location,
      map: this.map,
    })
    console.log(location);

  }


}
export class AddressDetails {
  public address!: google.maps.GeocoderAddressComponent[];
  public coordinates!: google.maps.GeocoderGeometry;
}
