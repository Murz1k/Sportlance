import {BaseApiClient} from '../../services/base-api-client';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserResponse} from "./user-response";

@Injectable()
export class UserApiClient extends BaseApiClient {
  public defaultHeaders: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    super();
  }

  public async getCurrentAsync(): Promise<UserResponse> {
    return await this.http.get<UserResponse>(this.baseApiUrl + '/user', {headers: this.defaultHeaders}).toPromise();
  }
}
