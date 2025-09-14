export interface NewCustomer {
  name: string;
  birthDate: string;
  nit: string;
  phoneNumber: string;
  email: string;
  password: string;
}

export interface Customer {
  id: string;
  userAccountId: string;
  name: string;
  birthDate: Date;
  nit: string;
  phoneNumber: string;
}

export interface CustomerQueryParams {
  userAccountId?: string;
  nit?: string;
}
