import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoseAddressComponent } from './chose-address.component';

describe('ChoseAddressComponent', () => {
  let component: ChoseAddressComponent;
  let fixture: ComponentFixture<ChoseAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoseAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoseAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
