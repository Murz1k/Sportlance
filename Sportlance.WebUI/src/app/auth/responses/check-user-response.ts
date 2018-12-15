import {ErrorResponse} from '../../core/error-response';

export interface CheckUserResponse extends ErrorResponse {
  email: string;
}
