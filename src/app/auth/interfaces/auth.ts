export enum AuthStatus {
  CHECKING,
  AUTHENTICATED,
  NOT_AUTHENTICATED,
}

export interface UserAccount {
  id: string;
  email: string;
  role: string;
  avatar: string | null;
}
