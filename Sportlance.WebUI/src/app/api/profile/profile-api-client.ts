import {BaseApiClient} from '../../services/base-api-client';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ProfileResponse} from './profile-response';

@Injectable()
export class ProfileApiClient extends BaseApiClient {
  public defaultHeaders: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {
    super();
  }

  public async getCurrentAsync(): Promise<ProfileResponse> {
    return await this.http.get<ProfileResponse>(this.baseApiUrl + '/profile/current', {headers: this.defaultHeaders}).toPromise();
  }
}
