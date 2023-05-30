import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPromocodesComponent } from './admin-promocodes.component';

describe('AdminPromocodesComponent', () => {
  let component: AdminPromocodesComponent;
  let fixture: ComponentFixture<AdminPromocodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPromocodesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPromocodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
