import { inject } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { AuthFacade } from 'src/app/auth/facades/auth-facade';

export const appInitializer = () => {
  const authFacade = inject(AuthFacade);
  return forkJoin([authFacade.checkAuth()]).pipe(
    map((results) => results.every((result) => result === true)),
  );
};
