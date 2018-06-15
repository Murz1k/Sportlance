import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserResponse} from './user-response';
import {BaseService} from '../common/base-service';

@Injectable()
export class UserApiClient extends BaseService {
  public defaultHeaders: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    super();
  }

  public async getCurrentAsync(): Promise<UserResponse> {
    return this.http.get<UserResponse>(this.baseApiUrl + '/user', {headers: this.defaultHeaders}).toPromise();
  }
}
