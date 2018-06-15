import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Sport} from './sport';
import {CollectionResponse} from './common/collection-response';
import {BaseService} from './common/base-service';

@Injectable()
export class SportService extends BaseService {

  public sports: Sport[] = [];

  constructor(private http: HttpClient) {
    super();
  }

  getAllAsync(): Promise<CollectionResponse<Sport>> {
    return this.http.get<CollectionResponse<Sport>>(this.baseApiUrl + '/sport').toPromise();
  }

  getByIdAsync(sportId: number): Promise<Sport> {
    return this.http.get<Sport>(`${this.baseApiUrl}/sport/${sportId}`).toPromise();
  }
}
