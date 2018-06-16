import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {TrainerInfoResponse} from './responses/trainer-info-response';
import {BaseService} from '../common/base-service';
import {TrainerProfileResponse} from './responses/trainer-profile-response';
import {CollectionResponse} from '../common/collection-response';
import {GetTrainersQuery} from './get-trainers-query';
import {isNullOrUndefined} from 'util';

@Injectable()
export class TrainersService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  getAsync(query: GetTrainersQuery): Promise<CollectionResponse<TrainerInfoResponse>> {
    const checkParam = (param) => isNullOrUndefined(param) ? '' : param.toString();
    const parameters = new HttpParams()
      .append('feedbacksMinCount', checkParam(query.feedbacksMinCount))
      .append('maxPrice', checkParam(query.maxPrice))
      .append('minPrice', checkParam(query.minPrice))
      .append('trainingsMaxCount', checkParam(query.trainingsMaxCount))
      .append('searchString', checkParam(query.searchString))
      .append('offset', checkParam(query.offset))
      .append('count', checkParam(query.count))
      .append('trainingsMinCount', checkParam(query.trainingsMinCount))
      .append('feedbacksMaxCount', checkParam(query.feedbacksMaxCount));
    return this.http.get<CollectionResponse<TrainerInfoResponse>>(`${this.baseApiUrl}/trainers`, {params: parameters}).toPromise();
  }

  getByIdAsync(trainerId: number): Promise<TrainerProfileResponse> {
    return this.http.get<TrainerProfileResponse>(`${this.baseApiUrl}/trainers/${trainerId}`).toPromise();
  }

  getSelfAsync(): Promise<TrainerProfileResponse> {
    return this.http.get<TrainerProfileResponse>(`${this.baseApiUrl}/trainers/self`).toPromise();
  }
}
