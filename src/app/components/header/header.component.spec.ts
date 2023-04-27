import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ShopService } from '../../services/shop.service';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { User, UserRole } from '../../models/user';
import { Guid } from 'guid-typescript';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const shopServiceStub = {
    getUser: () => of<User>({userRole: UserRole.User })
  };

  const authServiceStub = {
    isAuthenticated: () => true
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: ShopService, useValue: shopServiceStub },
        { provide: AuthService, useValue: authServiceStub }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set user role to admin if user is authenticated', () => {
    expect(component.user).toEqual(UserRole.User);
    fixture.detectChanges();
    if(authServiceStub){
      expect(component.user).toEqual(UserRole.Manager);
      fixture.detectChanges();
      expect(component.user).toEqual(UserRole.Admin);
    }
  });
});
