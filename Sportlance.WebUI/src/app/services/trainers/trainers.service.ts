import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {TrainerInfoResponse} from './responses/trainer-info-response';
import {BaseService} from '../common/base-service';
import {TrainerProfileResponse} from './responses/trainer-profile-response';
import {CollectionResponse} from '../common/collection-response';
import {GetTrainersQuery} from './get-trainers-query';
import {isNullOrUndefined} from 'util';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class TrainersService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  get(query: GetTrainersQuery): Observable<CollectionResponse<TrainerInfoResponse>> {
    const checkParam = (param) => isNullOrUndefined(param) ? '' : param.toString();
    const parameters = new HttpParams()
      .append('feedbacksMinCount', checkParam(query.feedbacksMinCount))
      .append('maxPrice', checkParam(query.maxPrice))
      .append('minPrice', checkParam(query.minPrice))
      .append('trainingsMaxCount', checkParam(query.trainingsMaxCount))
      .append('searchString', checkParam(query.searchString))
      .append('offset', checkParam(query.offset))
      .append('count', checkParam(query.count))
      .append('country', checkParam(query.country))
      .append('city', checkParam(query.city))
      .append('trainingsMinCount', checkParam(query.trainingsMinCount))
      .append('feedbacksMaxCount', checkParam(query.feedbacksMaxCount));
    return this.http.get<CollectionResponse<TrainerInfoResponse>>(`${this.baseApiUrl}/trainers`, {params: parameters});
  }

  canInviteTrainer(trainerId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseApiUrl}/trainers/${trainerId}/canInvite`);
  }

  getByIdAsync(trainerId: number): Promise<TrainerProfileResponse> {
    return this.http.get<TrainerProfileResponse>(`${this.baseApiUrl}/trainers/${trainerId}`).toPromise();
  }

  getSelfAsync(): Promise<TrainerProfileResponse> {
    return this.http.get<TrainerProfileResponse>(`${this.baseApiUrl}/trainers/self`).toPromise();
  }

  async uploadPhotoAsync(photo: Blob): Promise<void> {
    const data = new FormData();
    data.append('photo', photo);
    await this.http.put(`${this.baseApiUrl}/trainers/photo`, data).toPromise();
  }

  async uploadBackgorundImageAsync(photo: Blob): Promise<void> {
    const data = new FormData();
    data.append('photo', photo);
    await this.http.put(`${this.baseApiUrl}/trainers/background`, data).toPromise();
  }

  setAvailabilityAsync(isAvailable: boolean) {
    return this.http.post(`${this.baseApiUrl}/trainers/availability`, {isAvailable: isAvailable}).toPromise();
  }

  updateAboutAsync(about: string) {
    return this.http.put(`${this.baseApiUrl}/trainers/about`, {about: about}).toPromise();
  }

  updatePaidAsync(price: number) {
    return this.http.put(`${this.baseApiUrl}/trainers/price`, {price: price}).toPromise();
  }
}
