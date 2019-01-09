import {ErrorResponse} from '../../error-response';

export interface CheckUserResponse extends ErrorResponse {
  email: string;
}
