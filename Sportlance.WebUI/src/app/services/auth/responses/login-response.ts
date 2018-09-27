import {ErrorResponse} from '../../../core/error-response';

export interface LoginResponse extends ErrorResponse {
  firstName: string;

  secondName: string;

  token: string;

  roles: string[];

  email: string;

  isConfirmed: boolean;
}
