import {ErrorResponse} from '../../../core/error-response';

export interface LoginResponse extends ErrorResponse {
  accessToken: string;
  refreshToken: string;
}
