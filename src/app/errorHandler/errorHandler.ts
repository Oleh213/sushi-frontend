import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  public errorMessage: string = '';

  constructor() { }

  public handleError = (error: HttpErrorResponse) => {
    if (error.status === 500) {
      location.href = 'error-page'
    }
  }

}
