import {RegistrationRequest} from './requests/registration-request';
import {LoginRequest} from './requests/login-request';
import {LoginResponse} from './responses/login-response';
import {CheckUserRequest} from './requests/check-user-request';
import {ConfirmRegistrationRequest} from './requests/confirm-registration-request';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CheckUserResponse} from './responses/check-user-response';
import {ResendEmailRequest} from './requests/resend-email-request';
import {BaseService} from '../common/base-service';

@Injectable()
export class AuthApiClient extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  public async loginAsync(request: LoginRequest): Promise<LoginResponse> {
    return this.http.post<LoginResponse>(this.baseApiUrl + '/auth', request).toPromise();
  }

  public async registerAsync(request: RegistrationRequest): Promise<void> {
    await this.http.post(this.baseApiUrl + '/auth/register', request).toPromise();
  }

  public async reSendEmailAsync(token: string): Promise<void> {
    await this.http.post(this.baseApiUrl + '/auth/re-send', <ResendEmailRequest> {token: token}).toPromise();
  }

  public async confirmEmailAsync(request: ConfirmRegistrationRequest): Promise<LoginResponse> {
    return this.http.put<LoginResponse>(this.baseApiUrl + '/auth/confirm', request).toPromise();
  }

  public async checkUserAsync(email: string): Promise<CheckUserResponse> {
    return this.http.post<CheckUserResponse>(this.baseApiUrl + '/auth/check', <CheckUserRequest> {email: email}).toPromise();
  }
}
