import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, tap} from "rxjs";
import {AUTH_API_URL} from "../models/app-injections-tokens";
import {Tokens} from "../models/token";
import {JwtHelperService} from "@auth0/angular-jwt";

export const ACCESS_TOKEN_KEY= 'productstore_access_token'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    @Inject(AUTH_API_URL) private apiUrl: string,
    private jwtHelper: JwtHelperService,
    private route: Router,
  ) {
  }

  login(name: string, password: string): Observable<Tokens> {
    return this.http.post<Tokens>(`${this.apiUrl}LogInController/LogIn`, {
      name, password
    }).pipe(
      tap(tok => {
        localStorage.setItem(ACCESS_TOKEN_KEY, tok.access_token)
      })
    )
  }


  isAuthenticated(): boolean {
    const token = this.getTokenFromStorage();
    return !this.jwtHelper.isTokenExpired(token)
  }


  logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.route.navigate([''])
  }

  private getTokenFromStorage(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  private getAuthHeader() {
    const token = this.getTokenFromStorage();
    return {
      'Authorization': `Bearer ${token}`
    }
  }

  getRequest<T>(url: string, options?: { [key: string]: any }): Observable<T> {
    const headers = this.getAuthHeader();
    return this.http.get<T>(url, {headers, ...options});
  }

  postRequest<T>(url: string, body?: any, options?: { [key: string]: any }): Observable<T> {
    const headers = this.getAuthHeader();
    return this.http.post<T>(url, body, {headers, ...options});
  }

  delRequest<T>(url: string, options?: { [key: string]: any }): Observable<T> {
    const headers = this.getAuthHeader();
    return this.http.delete<T>(url, {headers, ...options});
  }

  patchRequest<T>(url: string, body?: any, options?: { [key: string]: any }): Observable<T> {
    const headers = this.getAuthHeader();
    return this.http.patch<T>(url, body, {headers, ...options});
  }
}



