import {ErrorResponse} from '../../../core/error-response';

export interface LoginResponse extends ErrorResponse {
  token: string;
}
