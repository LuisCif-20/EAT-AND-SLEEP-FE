import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@envs/environment';
import { tap } from 'rxjs';
import { RegisterData } from '../interfaces/customer.interface';

@Injectable({
  providedIn: 'root',
})
export class Customer {
  private readonly httpClient = inject(HttpClient);

  private readonly baseUrl = `${environment.API_URL}/customers`;

  private readonly _customerInfo = signal<Customer | null>(null);

  public readonly customerInfo = computed(() => this._customerInfo());

  public register(body: RegisterData) {
    return this.httpClient.post<void>(this.baseUrl, body);
  }

  public gerCustomerInfo(userAccountId: string) {
    return this.httpClient
      .get<Customer>(this.baseUrl, {
        params: { userAccountId },
      })
      .pipe(tap((customer) => this._customerInfo.set(customer)));
  }

  public forgetCustomer() {
    this._customerInfo.set(null);
  }
}
