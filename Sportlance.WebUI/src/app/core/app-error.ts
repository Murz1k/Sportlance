import {ErrorCode} from './error-code';

export interface AppError {
  code: ErrorCode;
  message: string;
}
