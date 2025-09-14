import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthState } from '../state/auth-state';

export const addAccessTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authSate = inject(AuthState);
  if (authSate.accessToken()) {
    const clone = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authSate.accessToken()}`),
    });
    return next(clone);
  }
  return next(req);
};
