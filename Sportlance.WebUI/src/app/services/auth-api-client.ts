import {BaseApiClient} from './base-api-client';
import {RegistrationRequest} from './registration-request';
import {LoginRequest} from './login-request';
import {LoginResponse} from './login-response';
import {CheckUserRequest} from './check-user-request';
import {ConfirmRegistrationRequest} from './confirm-registration-request';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CheckUserResponse} from "./check-user-response";

@Injectable()
export class AuthApiClient extends BaseApiClient {
  public defaultHeaders: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    super();
  }

  public async loginAsync(request: LoginRequest): Promise<LoginResponse> {
    return await this.http.post<LoginResponse>(this.baseApiUrl + '/auth', request, {headers: this.defaultHeaders}).toPromise();
  }

  public async registerAsync(request: RegistrationRequest): Promise<void> {
    await this.http.post(this.baseApiUrl + '/auth/register', request, {headers: this.defaultHeaders}).toPromise();
  }

  // public async reSendEmailAsync(address: string): Promise<void> {
  //   await this.http.post(this.baseApiUrl + '/auth/resend', <ReSendEmailRequest> {address: address}).toPromise();
  // }
  //
  public async confirmEmailAsync(request: ConfirmRegistrationRequest): Promise<LoginResponse> {
    return await this.http.put<LoginResponse>(this.baseApiUrl + '/auth/confirm', request, {headers: this.defaultHeaders}).toPromise();
  }

  public async checkUserAsync(email: string): Promise<CheckUserResponse> {
    return await this.http.post<CheckUserResponse>(this.baseApiUrl + '/auth/check', <CheckUserRequest> {email: email}, {headers: this.defaultHeaders}).toPromise();
  }
}
