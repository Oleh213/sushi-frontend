import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivate {
  constructor(private auth: AuthService) {
  }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      location.href = "";
    }
    return true
  }

}
