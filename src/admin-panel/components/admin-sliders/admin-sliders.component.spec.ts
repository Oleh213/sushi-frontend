import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSlidersComponent } from './admin-sliders.component';

describe('AdminSlidersComponent', () => {
  let component: AdminSlidersComponent;
  let fixture: ComponentFixture<AdminSlidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSlidersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSlidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
