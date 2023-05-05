import {Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {debounceTime, Subject, Subscription, switchMap} from "rxjs";
import {ShopService} from "../services/shop.service";
import {MapService} from "../services/map.service";

@Directive({
  selector: '[appSearchDerective]'
})
export class SearchDirective implements OnInit, OnDestroy {

  private context: any = {};
  private searchSubject: Subject<string> = new Subject();
  private subscriptions: Subscription[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private mapService: MapService,
  ) {
    this.context = {
      options: [],
      onSearchChange: this.onSearchChange,
    }
  }

  ngOnInit() {
    this.viewContainerRef.createEmbeddedView(this.templateRef, this.context);
    this.subscriptions.push(
      this.searchSubject.asObservable().pipe(debounceTime(100),
        switchMap(term => this.mapService.searchAddress(term)))
        .subscribe(options => {this.context.options = options}),
    );
  }

  onSearchChange = (searchTerm: string) => {
    this.searchSubject.next(searchTerm);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }
}

