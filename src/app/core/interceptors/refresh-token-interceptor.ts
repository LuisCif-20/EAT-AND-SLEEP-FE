import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthFacade } from '../../auth/facades/auth-facade';
import { AuthState } from '../../auth/state/auth-state';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authState = inject(AuthState);
  const authFacade = inject(AuthFacade);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === HttpStatusCode.Unauthorized && authState.accessToken()) {
        return authFacade.refreshTokenOrLogout().pipe(
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
