import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthStatus } from 'src/app/auth/interfaces/auth';
import { AuthState } from 'src/app/auth/state/auth-state';

export const authGuard: CanMatchFn = (_route, _segments) => {
  const authState = inject(AuthState);
  if (authState.authStatus() === AuthStatus.AUTHENTICATED) return true;
  const router = inject(Router);
  return router.parseUrl('/auth');
};
