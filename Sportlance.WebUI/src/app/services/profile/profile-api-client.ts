import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ProfileResponse} from './profile-response';
import {BaseService} from '../common/base-service';

@Injectable()
export class ProfileApiClient extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  public async getCurrentAsync(): Promise<ProfileResponse> {
    return this.http.get<ProfileResponse>(this.baseApiUrl + '/profile/current').toPromise();
  }
}
