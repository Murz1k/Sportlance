import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Trainer} from './trainer';
import {CollectionResponse} from './collection-response';
import {BaseApiClient} from './base-api-client';

@Injectable()
export class TrainerService extends BaseApiClient {
  constructor(private http: HttpClient) {
    super();
  }

  getTrainersBySportIdAsync(sportId: number): Promise<CollectionResponse<Trainer>> {
    return this.http.get<CollectionResponse<Trainer>>(`${this.baseApiUrl}/trainer/sport/${sportId}`).toPromise();
  }
}
