import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TrainerInfoResponse} from '../shared/trainers/responses/trainer-info-response';
import {TrainerProfileResponse} from '../shared/trainers/responses/trainer-profile-response';
import {CollectionResponse} from '../core/collection-response';
import {GetTrainersQuery} from '../shared/trainers/get-trainers-query';
import {isNullOrUndefined} from 'util';
import {Observable} from 'rxjs/internal/Observable';
import {TrainingResponse} from '../shared/trainers/responses/training-response';
import {LoginResponse} from '../core/auth/responses/login-response';
import {ErrorResponse} from '../core/error-response';
import {of} from 'rxjs';
import {tap} from 'rxjs/operators';


function deepEqual(x, y) {
  const ok = Object.keys, tx = typeof x, ty = typeof y;
  return x && y && tx === 'object' && tx === ty ? (
    ok(x).length === ok(y).length &&
    ok(x).every(key => deepEqual(x[key], y[key]))
  ) : (x === y);
}

@Injectable()
export class TrainersService {
  constructor(private http: HttpClient) {
  }

  trainersGetQuery: GetTrainersQuery;
  trainersCollection: CollectionResponse<TrainerInfoResponse> & ErrorResponse;

  get(query: GetTrainersQuery): Observable<CollectionResponse<TrainerInfoResponse> & ErrorResponse> {

    if (this.trainersCollection && this.trainersCollection.items.length > 0 && deepEqual(this.trainersGetQuery, query)) {
      return of(this.trainersCollection);
    }

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
      .append('teamId', checkParam(query.teamId))
      .append('trainingsMinCount', checkParam(query.trainingsMinCount))
      .append('feedbacksMaxCount', checkParam(query.feedbacksMaxCount));

    return this.http.get<CollectionResponse<TrainerInfoResponse> & ErrorResponse>(`/api/trainers`, {params: parameters})
      .pipe(tap((response) => {
        if (!response.error) {
          this.trainersGetQuery = query;
          this.trainersCollection = response;
        }
      }));
  }

  getById(trainerId: number): Observable<TrainerProfileResponse> {
    return this.http.get<TrainerProfileResponse>(`/api/trainers/${trainerId}`);
  }

  getSelf(): Observable<TrainerProfileResponse> {
    return this.http.get<TrainerProfileResponse>(`/api/trainers/self`);
  }

  uploadBackgorundImage(photo: Blob) {
    const data = new FormData();
    data.append('photo', photo);
    return this.http.put(`/api/trainers/background`, data);
  }

  beTrainer(): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`/api/trainers`, {});
  }

  setAvailability(isAvailable: boolean) {
    return this.http.post(`/api/trainers/availability`, {isAvailable: isAvailable});
  }

  updateAbout(about: string) {
    return this.http.put(`/api/trainers/about`, {about: about});
  }

  updatePaid(price: number) {
    return this.http.put(`/api/trainers/price`, {price: price});
  }

  getTrainings(trainerId: number, startDate: string, endDate: string): Observable<CollectionResponse<TrainingResponse>> {
    const checkParam = (param) => isNullOrUndefined(param) ? '' : param.toString();
    const parameters = new HttpParams()
      .append('startDate', checkParam(startDate))
      .append('endDate', checkParam(endDate));
    return this.http.get<CollectionResponse<TrainingResponse>>(`/api/trainers/${trainerId}/trainings`, {params: parameters});
  }

  addTraining(trainerId: number, startDate: string, sportId: number): Observable<Object> {
    return this.http.post(`/api/trainers/${trainerId}/trainings`, {
      startDate: startDate,
      sportId: sportId
    });
  }
}
