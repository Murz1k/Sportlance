import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BaseService} from '../common/base-service';
import {ReviewInfoResponse} from './responses/review-info-response';
import {isNullOrUndefined} from 'util';
import {CollectionResponse} from '../common/collection-response';

@Injectable({
  providedIn: 'root'
})
export class FeedbacksService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  getTrainerFeedbacksAsync(trainerId: number, offset: number, count: number): Promise<CollectionResponse<ReviewInfoResponse>> {
    const checkParam = (param) => isNullOrUndefined(param) ? '' : param.toString();
    const parameters = new HttpParams()
      .append('offset', checkParam(offset))
      .append('count', checkParam(count));
    return this.http.get<CollectionResponse<ReviewInfoResponse>>(`${this.baseApiUrl}/trainers/${trainerId}/feedbacks`, {params: parameters}).toPromise();
  }

  getSelfTrainerFeedbacksAsync(offset: number, count: number): Promise<CollectionResponse<ReviewInfoResponse>> {
    const checkParam = (param) => isNullOrUndefined(param) ? '' : param.toString();
    const parameters = new HttpParams()
      .append('offset', checkParam(offset))
      .append('count', checkParam(count));
    return this.http.get<CollectionResponse<ReviewInfoResponse>>(`${this.baseApiUrl}/trainers/self/feedbacks`, {params: parameters}).toPromise();
  }
}
