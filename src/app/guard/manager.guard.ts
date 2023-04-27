import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivate {
  constructor(private auth: AuthService, private route:Router) {
  }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.route.navigate([''])
    }
    return true
  }

}
