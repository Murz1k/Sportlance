import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ReviewInfoResponse} from './responses/review-info-response';
import {isNullOrUndefined} from 'util';
import {CollectionResponse} from '../common/collection-response';
import {Observable} from 'rxjs';
import {ErrorResponse} from "../../core/error-response";

@Injectable({
  providedIn: 'root'
})
export class FeedbacksService {
  constructor(private http: HttpClient) {
  }

  getTrainerFeedbacks(trainerId: number, offset: number, count: number): Observable<CollectionResponse<ReviewInfoResponse> | ErrorResponse | any> {
    const checkParam = (param) => isNullOrUndefined(param) ? '' : param.toString();
    const parameters = new HttpParams()
      .append('offset', checkParam(offset))
      .append('count', checkParam(count));
    return this.http.get<CollectionResponse<ReviewInfoResponse>>(`/trainers/${trainerId}/feedbacks`, {params: parameters});
  }

  getSelfTrainerFeedbacks(offset: number, count: number): Observable<CollectionResponse<ReviewInfoResponse>> {
    const checkParam = (param) => isNullOrUndefined(param) ? '' : param.toString();
    const parameters = new HttpParams()
      .append('offset', checkParam(offset))
      .append('count', checkParam(count));
    return this.http.get<CollectionResponse<ReviewInfoResponse>>(`/trainers/self/feedbacks`, {params: parameters});
  }
}
