import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SecurityService } from '../services/security.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public securityService: SecurityService,
              private router: Router) {}

  /**
   * 
   * @param request 
   * @param next 
   * @returns 
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentSession = this.securityService.userCurrentSession
    if(currentSession){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentSession.token}`
        }
      });
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status === 401) {
          this.router.navigateByUrl('/pages/dashboard');
        }
        return throwError(err);
      })
    );
  }
}
