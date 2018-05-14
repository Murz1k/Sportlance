import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Trainer} from './trainer';
import {CollectionResponse} from './collection-response';
import {BaseApiClient} from './base-api-client';

@Injectable()
export class TrainerService extends BaseApiClient {
  constructor(private http: HttpClient) {
    super();
  }

  getTrainersAsync(): Promise<CollectionResponse<Trainer>> {
    const parameters = new HttpParams()
      .append('price', '')
      .append('reviewsCount', '');
    return this.http.get<CollectionResponse<Trainer>>(`${this.baseApiUrl}/trainers`, { params: parameters }).toPromise();
  }

  getByIdAsync(trainerId: number): Promise<Trainer> {
    return this.http.get<Trainer>(`${this.baseApiUrl}/trainers/${trainerId}`).toPromise();
  }
}
