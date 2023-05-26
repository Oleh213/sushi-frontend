import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWorkTimeComponent } from './admin-work-time.component';

describe('AdminWorkTimeComponent', () => {
  let component: AdminWorkTimeComponent;
  let fixture: ComponentFixture<AdminWorkTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminWorkTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminWorkTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
