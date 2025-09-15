import { inject, Injectable } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { UserAccountService } from '../services/user-account-service';
import { CustomerService } from 'src/app/customer/services/customer-service';
import { AuthState } from '../state/auth-state';
import { catchError, finalize, map, of, switchMap, tap, throwError } from 'rxjs';
import { AuthStatus, LoginData } from '../interfaces/auth';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { NewCustomer } from 'src/app/customer/interfaces/customer';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  private readonly authService = inject(AuthService);
  private readonly userAccountService = inject(UserAccountService);
  private readonly customerService = inject(CustomerService);
  private readonly authState = inject(AuthState);

  private loadUserInfo() {
    return this.userAccountService.getUserAccountInfo().pipe(
      switchMap((userAccount) => {
        this.authState.setUserAccount(userAccount);
        return this.customerService.getAllCustomers({ userAccountId: userAccount.id });
      }),
      map((customers) => {
        if (customers.length === 0) {
          this.authState.clear();
          return false;
        }
        this.authState.setAuthCustomer(customers[0]);
        this.authState.setAuthStatus(AuthStatus.AUTHENTICATED);
        return true;
      }),
    );
  }

  public loginAndGetInfo(body: LoginData) {
    return this.authService.login(body).pipe(
      switchMap(({ accessToken }) => {
        this.authState.setAccessToken(accessToken);
        return this.loadUserInfo();
      }),
    );
  }

  public registerAndLogin(body: NewCustomer) {
    return this.customerService.createCustomer(body).pipe(
      switchMap(() => {
        const { email, password } = body;
        return this.loginAndGetInfo({ email, password });
      }),
    );
  }

  public refreshTokenOrLogout() {
    return this.authService.refreshToken().pipe(
      tap(({ accessToken }) => this.authState.setAccessToken(accessToken)),
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Unauthorized) return this.logoutAndClear();
        return throwError(() => error);
      }),
    );
  }

  public logoutAndClear() {
    return this.authService.logout().pipe(finalize(() => this.authState.clear()));
  }

  public checkAuth() {
    return this.refreshTokenOrLogout().pipe(
      switchMap(() => this.loadUserInfo()),
      catchError(() => {
        this.authState.setAuthStatus(AuthStatus.NOT_AUTHENTICATED);
        return of(false);
      }),
    );
  }

  public updateUserAccountAndLoadNewInfo(body: FormData) {
    return this.userAccountService.updateUserAccountInfo(body).pipe(
      switchMap(() => this.userAccountService.getUserAccountInfo()),
      map((userAccount) => {
        this.authState.setUserAccount(userAccount);
      }),
    );
  }
}
