import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TrainerInfoResponse} from '../shared/trainers/responses/trainer-info-response';
import {TrainerProfileResponse} from '../shared/trainers/responses/trainer-profile-response';
import {CollectionResponse} from '../services/common/collection-response';
import {GetTrainersQuery} from '../shared/trainers/get-trainers-query';
import {isNullOrUndefined} from 'util';
import {Observable} from 'rxjs/internal/Observable';
import {TrainingResponse} from '../shared/trainers/responses/training-response';

@Injectable()
export class TrainersService {
  constructor(private http: HttpClient) {
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
      .append('teamId', checkParam(query.teamId))
      .append('trainingsMinCount', checkParam(query.trainingsMinCount))
      .append('feedbacksMaxCount', checkParam(query.feedbacksMaxCount));
    return this.http.get<CollectionResponse<TrainerInfoResponse>>(`/trainers`, {params: parameters});
  }

  canInviteTrainer(trainerId: number): Observable<boolean> {
    return this.http.get<boolean>(`/trainers/${trainerId}/canInvite`);
  }

  getById(trainerId: number): Observable<TrainerProfileResponse> {
    return this.http.get<TrainerProfileResponse>(`/trainers/${trainerId}`);
  }

  getSelf(): Observable<TrainerProfileResponse> {
    return this.http.get<TrainerProfileResponse>(`/trainers/self`);
  }

  async uploadPhotoAsync(photo: Blob): Promise<void> {
    const data = new FormData();
    data.append('photo', photo);
    await this.http.put(`/trainers/photo`, data).toPromise();
  }

  async uploadBackgorundImageAsync(photo: Blob): Promise<void> {
    const data = new FormData();
    data.append('photo', photo);
    await this.http.put(`/trainers/background`, data).toPromise();
  }

  setAvailability(isAvailable: boolean) {
    return this.http.post(`/trainers/availability`, {isAvailable: isAvailable});
  }

  updateAboutAsync(about: string) {
    return this.http.put(`/trainers/about`, {about: about}).toPromise();
  }

  updatePaidAsync(price: number) {
    return this.http.put(`/trainers/price`, {price: price}).toPromise();
  }

  getTrainings(trainerId: number, startDate: string, endDate: string): Observable<CollectionResponse<TrainingResponse>> {
    const checkParam = (param) => isNullOrUndefined(param) ? '' : param.toString();
    const parameters = new HttpParams()
      .append('startDate', checkParam(startDate))
      .append('endDate', checkParam(endDate));
    return this.http.get<CollectionResponse<TrainingResponse>>(`/trainers/${trainerId}/trainings`, {params: parameters});
  }

  addTraining(trainerId: number, startDate: string, sportId: number): Observable<Object> {
    return this.http.post(`/trainers/${trainerId}/trainings`, {
      startDate: startDate,
      sportId: sportId
    });
  }
}
