import {ErrorResponse} from '../../error-response';

export interface LoginResponse extends ErrorResponse {
  accessToken: string;
  refreshToken: string;
}
