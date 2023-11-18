import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AccountService } from './account.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token: string = localStorage.getItem('token') + '';
  constructor(private accountService: AccountService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const request = req.clone({
      setHeaders: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.accountService.logout();
        }
        return throwError(error);
      })
    );
  }
}
