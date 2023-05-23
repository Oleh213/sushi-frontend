import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShopSettingComponent } from './admin-shop-setting.component';

describe('AdminShopSettingComponent', () => {
  let component: AdminShopSettingComponent;
  let fixture: ComponentFixture<AdminShopSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminShopSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminShopSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
