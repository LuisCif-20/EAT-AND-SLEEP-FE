import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@envs/environment';
import { Customer, CustomerQueryParams, NewCustomer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly httpClient = inject(HttpClient);

  private readonly baseUrl = `${environment.API_URL}/customers`;

  public getAllCustomers(params: CustomerQueryParams) {
    return this.httpClient.get<Customer[]>(this.baseUrl, {
      params: { ...params },
    });
  }

  public createCustomer(body: NewCustomer) {
    return this.httpClient.post<void>(this.baseUrl, body);
  }
}
