// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormBuilder } from '@angular/forms';
// import { RouterTestingModule } from '@angular/router/testing';
// import { of } from 'rxjs';
// import { ShopService } from '../../services/shop.service';
// import { CheckoutComponent } from './checkout.component';
//
// describe('CheckoutComponent', () => {
//   let component: CheckoutComponent;
//   let fixture: ComponentFixture<CheckoutComponent>;
//   let mockShopService: jasmine.SpyObj<ShopService>;
//
//   beforeEach(async () => {
//     mockShopService = jasmine.createSpyObj('ShopService', ['getTotalPrice', 'getPromoDiscount']);
//
//     await TestBed.configureTestingModule({
//       declarations: [CheckoutComponent],
//       imports: [RouterTestingModule],
//       providers: [
//         FormBuilder,
//         { provide: ShopService, useValue: mockShopService },
//       ],
//     }).compileComponents();
//   });
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(CheckoutComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//
//   // it('should set subTotalPrice and totalPrice on init', () => {
//   //   const expectedPrice = 10;
//   //   mockShopService.getTotalPrice.and.returnValue(of({ data: expectedPrice }));
//   //   component.ngOnInit();
//   //
//   //   expect(mockShopService.getTotalPrice).toHaveBeenCalled();
//   //   expect(component.subTotalPrice).toEqual(expectedPrice);
//   //   expect(component.totalPrice).toEqual(expectedPrice);
//   // });
//
//   it('should build initial hours', () => {
//     const expectedHours = [new Date(2023, 2, 23, 11, 30), new Date(2023, 2, 23, 12, 0)];
//
//     component.buildInitialHours();
//
//     expect(component.initialHours).toEqual(expectedHours);
//   });
//
//   it('should change payment method', () => {
//     componentю('cash');
//     expect(component.paymentMethod.cash).toBeTrue();
//     expect(component.paymentMethod.cardOnline).toBeFalse();
//     expect(component.paymentMethod.cardInStore).toBeFalse();
//
//     component.changePaymentMethod('cardOnline');
//     expect(component.paymentMethod.cash).toBeFalse();
//     expect(component.paymentMethod.cardOnline).toBeTrue();
//     expect(component.paymentMethod.cardInStore).toBeFalse();
//
//     component.changePaymentMethod('cardInStore');
//     expect(component.paymentMethod.cash).toBeFalse();
//     expect(component.paymentMethod.cardOnline).toBeFalse();
//     expect(component.paymentMethod.cardInStore).toBeTrue();
//   });
//
//   it('should change delivery time', () => {
//     component.changeDeliveryTime('asap');
//     expect(component.deliveryOption.asap).toBeTrue();
//     expect(component.deliveryOption.onTime).toBeFalse();
//
//     component.changeDeliveryTime('onTime');
//     expect(component.deliveryOption.asap).toBeFalse();
//     expect(component.deliveryOption.onTime).toBeTrue();
//   });
//
//   it('should open/close promo field', () => {
//     component.promoCode.promoField = false;
//     component.openClosePromoField();
//     expect(component.promoCode.promoField).toBeTrue();
//
//     component.openClosePromoField();
//     expect(component.promoCode.promoField).toBeFalse();
//   });
//
//   // it('should use promo code', () => {
//   //   const expectedDiscount = 2;
//   //   mockShopService.getPromoDiscount.and.returnValue(of({data: expectedDiscount}));
//   //   component.deliveryOption.picUp = true;
//   //   component.subTotalPrice = 10;
//   //
//   //   component.usePromoCode();
//   //
//   //   expect(mockShopService.getPromoDiscount).toHaveBeenCalledWith(component.promoCode.usedPromoCode);
//   //   expect(component.promoCode.promoDiscount).toEqual(expectedDiscount + component.subTotalPrice);
//   //
//   // });
// });
