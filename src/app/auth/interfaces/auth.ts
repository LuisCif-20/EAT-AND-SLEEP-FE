export enum AuthStatus {
  CHECKING,
  AUTHENTICATED,
  NOT_AUTHENTICATED,
}

export interface LoginData {
  email: string;
  password: string;
}
