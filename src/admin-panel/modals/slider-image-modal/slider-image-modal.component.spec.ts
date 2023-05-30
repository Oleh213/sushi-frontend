import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderImageModalComponent } from './slider-image-modal.component';

describe('SliderImageModalComponent', () => {
  let component: SliderImageModalComponent;
  let fixture: ComponentFixture<SliderImageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderImageModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderImageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
