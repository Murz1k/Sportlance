import {BaseApiClient} from './base-api-client';
import {RegistrationRequest} from './registration-request';
import {ConfirmRegistrationRequest} from './confirm-registration-request';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthApiClient extends BaseApiClient {
  constructor(private http: HttpClient) {
    super();
  }
  //
  // public async authenticateAsync(request: AuthenticationRequest): Promise<AuthenticationResponse> {
  //   return await this.http.post<AuthenticationResponse>(this.baseApiUrl + '/auth', request).toPromise();
  // }

  public async registerAsync(request: RegistrationRequest): Promise<void> {
    await this.http.post(this.baseApiUrl + '/auth/register', request).toPromise();
  }

  // public async reSendEmailAsync(address: string): Promise<void> {
  //   await this.http.post(this.baseApiUrl + '/auth/resend', <ReSendEmailRequest> {address: address}).toPromise();
  // }
  //
  public async confirmEmailAsync(request: ConfirmRegistrationRequest): Promise<void> {
    await this.http.put(this.baseApiUrl + '/auth/confirm', request).toPromise();
  }
}
