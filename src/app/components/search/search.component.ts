import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AddressDetails, MapService} from "../../services/map.service";
import {GeocoderAddressComponent} from "@agm/core";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{
  @Output() searchTermChange: EventEmitter<string> = new EventEmitter();
  @Input()
  set options(options: AddressDetails[]) {
    this.model = this.searchTerm.length > 2;
    this._options = options;
  }
  public model = false;
  public searchTerm: string ='';
  public _options: AddressDetails[] = [];

  constructor(public mapService: MapService,
  ) {
  }


  onSearchTermChange(searchTerm: any) {
    this.searchTerm = searchTerm;
    this.searchTermChange.emit(this.searchTerm);
  }

  ngOnInit(): void {
  }

}
