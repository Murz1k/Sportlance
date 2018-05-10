export interface LoginResponse {
  firstName: string;

  secondName: string;

  token: string;

  roles: string[];

  email: string;

  isConfirmed: boolean;
}
