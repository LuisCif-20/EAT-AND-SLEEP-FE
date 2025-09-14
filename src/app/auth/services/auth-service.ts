import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@envs/environment';
import { LoginData } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);

  private readonly baseUrl = `${environment.API_URL}/auth`;

  public login(body: LoginData) {
    const url = `${this.baseUrl}/login`;
    return this.httpClient.post<{ accessToken: string }>(url, body);
  }

  public refreshToken() {
    const url = `${this.baseUrl}/refresh-token`;
    return this.httpClient.post<{ accessToken: string }>(url, null);
  }

  public logout() {
    const url = `${this.baseUrl}/logout`;
    return this.httpClient.post<void>(url, null);
  }
}
