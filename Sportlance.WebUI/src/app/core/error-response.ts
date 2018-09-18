import {ErrorCode} from './error-code';

export interface ErrorResponse {
  errorCode: ErrorCode;
  errorMsg: string;
}
