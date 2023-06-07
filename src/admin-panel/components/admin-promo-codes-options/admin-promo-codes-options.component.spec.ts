import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPromoCodesOptionsComponent } from './admin-promo-codes-options.component';

describe('AdminPromoCodesOptionsComponent', () => {
  let component: AdminPromoCodesOptionsComponent;
  let fixture: ComponentFixture<AdminPromoCodesOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPromoCodesOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPromoCodesOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
