import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';

export const addAccessTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);
  if (auth.accessToken()) {
    const clone = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${auth.accessToken()}`),
    });
    return next(clone);
  }
  return next(req);
};
