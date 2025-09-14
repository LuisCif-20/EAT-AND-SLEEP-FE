import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthStatus, UserAccount } from '../interfaces/auth';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { environment } from '@envs/environment';
import { catchError, map, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly httpClient = inject(HttpClient);

  private readonly baseAuthUrl = `${environment.API_URL}/auth`;
  private readonly baseUserAccountUrl = `${environment.API_URL}/user-accounts`;

  private readonly _accessToken = signal<string | null>(null);
  private readonly _userAccount = signal<UserAccount | null>(null);
  private readonly _authStatus = signal<AuthStatus>(AuthStatus.CHECKING);

  public readonly accessToken = computed(() => this._accessToken());
  public readonly userAccount = computed(() => this._userAccount());
  public readonly authStatus = computed(() => this._authStatus());

  private getUserAccountInfo() {
    const url = `${this.baseUserAccountUrl}/me`;
    return this.httpClient.get<UserAccount>(url).pipe(
      tap((userAccount) => {
        this._userAccount.set(userAccount);
        this._authStatus.set(AuthStatus.AUTHENTICATED);
      }),
    );
  }

  public login(email: string, password: string) {
    const url = `${this.baseAuthUrl}/login`;
    return this.httpClient.post<{ accessToken: string }>(url, { email, password }).pipe(
      switchMap(({ accessToken }) => {
        this._accessToken.set(accessToken);
        return this.getUserAccountInfo();
      }),
    );
  }

  public refreshToken() {
    const url = `${this.baseAuthUrl}/refresh-token`;
    return this.httpClient.post<{ accessToken: string }>(url, null).pipe(
      map(({ accessToken }) => {
        this._accessToken.set(accessToken);
        return true;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Unauthorized) return this.logout();
        return throwError(() => error);
      }),
    );
  }

  public logout() {
    const url = `${this.baseAuthUrl}/logout`;
    return this.httpClient.post<void>(url, null).pipe(
      map(() => {
        this._accessToken.set(null);
        this._userAccount.set(null);
        this._authStatus.set(AuthStatus.NOT_AUTHENTICATED);
        return true;
      }),
    );
  }

  public checkAuthentication() {
    return this.refreshToken().pipe(
      switchMap(() => {
        return this.getUserAccountInfo();
      }),
      catchError((error: HttpErrorResponse) => {
        this._authStatus.set(AuthStatus.NOT_AUTHENTICATED);
        return throwError(() => error);
      }),
    );
  }
}
