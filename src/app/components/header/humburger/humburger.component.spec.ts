import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumburgerComponent } from './humburger.component';

describe('HumburgerComponent', () => {
  let component: HumburgerComponent;
  let fixture: ComponentFixture<HumburgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HumburgerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HumburgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
