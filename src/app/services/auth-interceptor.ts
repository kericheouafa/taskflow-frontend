import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  const authReq = token
    ? req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) })
    : req;

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      const isAuthCall = req.url.includes('session') || req.url.includes('/session');

      if ((err.status === 401 || err.status === 403) && token && !isAuthCall) {
        localStorage.removeItem('token');
        router.navigate(['/session']);
      }
      return throwError(() => err);
    })
  );
};