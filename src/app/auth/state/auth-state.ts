import { computed, Injectable, signal } from '@angular/core';
import { AuthStatus } from '../interfaces/auth';
import { UserAccount } from '../interfaces/user-account';
import { Customer } from 'src/app/customer/interfaces/customer';

@Injectable({
  providedIn: 'root',
})
export class AuthState {
  private readonly _accessToken = signal<string | null>(null);
  private readonly _authStatus = signal<AuthStatus>(AuthStatus.CHECKING);
  private readonly _userAccount = signal<UserAccount | null>(null);
  private readonly _authCustomer = signal<Customer | null>(null);

  public readonly accessToken = computed(() => this._accessToken());
  public readonly authStatus = computed(() => this._authStatus());
  public readonly userAccount = computed(() => this._userAccount());
  public readonly authCustomer = computed(() => this._authCustomer());

  public setAccessToken(accesstoken: string) {
    this._accessToken.set(accesstoken);
  }

  public setAuthStatus(authStatus: AuthStatus) {
    this._authStatus.set(authStatus);
  }

  public setUserAccount(userAccount: UserAccount) {
    this._userAccount.set(userAccount);
  }

  public setAuthCustomer(authCustomer: Customer) {
    this._authCustomer.set(authCustomer);
  }

  public clear() {
    this._accessToken.set(null);
    this._authStatus.set(AuthStatus.NOT_AUTHENTICATED);
    this._userAccount.set(null);
    this._authCustomer.set(null);
  }
}
