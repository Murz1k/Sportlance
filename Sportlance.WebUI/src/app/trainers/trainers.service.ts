import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TrainerResponse} from '../shared/trainers/responses/trainer-response';
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
import {TeamResponse} from '../shared/teams/requests/team-response';


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
  trainersCollection: CollectionResponse<TrainerResponse> & ErrorResponse;
  selectedTrainer: TrainerResponse & ErrorResponse;

  get(query: GetTrainersQuery): Observable<CollectionResponse<TrainerResponse> & ErrorResponse> {

    if (this.trainersCollection && this.trainersCollection.items.length > 0 && deepEqual(this.trainersGetQuery, query)) {
      return of(this.trainersCollection);
    }

    const checkParam = (param) => isNullOrUndefined(param) ? '' : param.toString();
    const parameters = new HttpParams()
      .append('feedbacksMinCount', checkParam(query.feedbacksMinCount))
      .append('maxPrice', checkParam(query.maxPrice))
      .append('minPrice', checkParam(query.minPrice))
      .append('trainingsMaxCount', checkParam(query.trainingsMaxCount))
      .append('search', checkParam(query.search))
      .append('offset', checkParam(query.offset))
      .append('count', checkParam(query.count))
      .append('country', checkParam(query.country))
      .append('city', checkParam(query.city))
      .append('teamId', checkParam(query.teamId))
      .append('trainingsMinCount', checkParam(query.trainingsMinCount))
      .append('feedbacksMaxCount', checkParam(query.feedbacksMaxCount));

    return this.http.get<CollectionResponse<TrainerResponse> & ErrorResponse>(`/api/trainers`, {params: parameters})
      .pipe(tap((response) => {
        if (!response.error) {
          this.trainersGetQuery = query;
          this.trainersCollection = response;
        }
      }));
  }

  getById(trainerId: number): Observable<TrainerResponse & ErrorResponse> {

    if (trainerId === undefined || trainerId === null) {
      throw new Error('Param "trainerId" is required');
    }

    if (this.trainersCollection && this.trainersCollection.items.some(trainer => trainer.id === +trainerId)) {
      this.selectedTrainer = <TrainerResponse & ErrorResponse>this.trainersCollection.items.find(trainer => trainer.id === +trainerId);
    }

    if (this.selectedTrainer && this.selectedTrainer.id === +trainerId) {
      return of(this.selectedTrainer);
    }

    return this.http.get<TrainerResponse & ErrorResponse>(`/api/trainers/${trainerId}`)
      .pipe(tap((response) => {
        if (!response.error) {
          this.selectedTrainer = response;
        }
      }));
  }

  getSelf(): Observable<TrainerResponse & ErrorResponse> {
    return this.http.get<TrainerResponse & ErrorResponse>(`/api/trainers/self`)
      .pipe(tap((response) => {
        if (!response.error) {
          this.selectedTrainer = response;
        }
      }));
  }

  uploadBackgorundImage(photo: Blob): Observable<TrainerResponse & ErrorResponse> {
    const data = new FormData();
    data.append('photo', photo);
    return this.http.put<TrainerResponse & ErrorResponse>(`/api/trainers/background`, data)
      .pipe(tap((response) => {
        if (!response.error) {
          this.selectedTrainer = response;
        }
      }));
  }

  beTrainer(): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`/api/trainers`, {});
  }

  setAvailability(isAvailable: boolean): Observable<TrainerResponse & ErrorResponse> {
    return this.http.post<TrainerResponse & ErrorResponse>(`/api/trainers/availability`, {isAvailable: isAvailable})
      .pipe(tap((response) => {
        if (!response.error) {
          this.selectedTrainer = response;
        }
      }));
  }

  updateAbout(about: string): Observable<TrainerResponse & ErrorResponse> {
    return this.http.put<TrainerResponse & ErrorResponse>(`/api/trainers/about`, {about: about})
      .pipe(tap((response) => {
        if (!response.error) {
          this.selectedTrainer = response;
        }
      }));
  }

  updatePaid(price: number): Observable<TrainerResponse & ErrorResponse> {
    return this.http.put<TrainerResponse & ErrorResponse>(`/api/trainers/price`, {price: price})
      .pipe(tap((response) => {
        if (!response.error) {
          this.selectedTrainer = response;
        }
      }));
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

  updateSkills(skills: any[]): Observable<TrainerResponse & ErrorResponse> {
    return this.http.put<TrainerResponse & ErrorResponse>(`/api/trainers/skills`, {skills: skills})
      .pipe(tap((response) => {
        if (!response.error) {
          this.selectedTrainer = response;
        }
      }));
  }
}
