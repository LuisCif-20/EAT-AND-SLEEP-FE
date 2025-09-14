import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@envs/environment';
import { UserAccount } from '../interfaces/user-account';

@Injectable({
  providedIn: 'root',
})
export class UserAccountService {
  private readonly httpClient = inject(HttpClient);

  private readonly baseUrl = `${environment.API_URL}/user-accounts`;

  public getUserAccountInfo() {
    const url = `${this.baseUrl}/me`;
    return this.httpClient.get<UserAccount>(url);
  }
}
