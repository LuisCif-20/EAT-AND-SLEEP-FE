import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';
import { catchError, switchMap, throwError } from 'rxjs';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === HttpStatusCode.Unauthorized && auth.accessToken()) {
        return auth.refreshToken().pipe(
          switchMap(() => {
            const newReq = req.clone();
            return next(newReq);
          }),
        );
      }
      return throwError(() => error);
    }),
  );
};
