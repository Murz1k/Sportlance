import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SportResponse} from './sport-response';
import {CollectionResponse} from '../common/collection-response';
import {BaseService} from '../common/base-service';

@Injectable()
export class SportService extends BaseService {

  public sports: SportResponse[] = [];

  constructor(private http: HttpClient) {
    super();
  }

  getAllAsync(): Promise<CollectionResponse<SportResponse>> {
    return this.http.get<CollectionResponse<SportResponse>>(this.baseApiUrl + '/sport').toPromise();
  }

  getByIdAsync(sportId: number): Promise<SportResponse> {
    return this.http.get<SportResponse>(`${this.baseApiUrl}/sport/${sportId}`).toPromise();
  }
}
