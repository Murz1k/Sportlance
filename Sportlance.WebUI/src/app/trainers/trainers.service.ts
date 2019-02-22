import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TrainerResponse} from '../shared/trainers/responses/trainer-response';
import {CollectionResponse} from '../core/collection-response';
import {GetTrainersQuery} from '../shared/trainers/get-trainers-query';
import {Observable} from 'rxjs/internal/Observable';
import {TrainingResponse} from '../shared/trainers/responses/training-response';
import {LoginResponse} from '../core/auth/responses/login-response';
import {ErrorResponse} from '../core/error-response';
import {of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {TrainerWorkExperienceResponse} from '../shared/trainers/responses/trainer-work-experience-response';


function deepEqual(x, y) {
  const ok = Object.keys, tx = typeof x, ty = typeof y;
  return x && y && tx === 'object' && tx === ty ? (
    ok(x).length === ok(y).length &&
    ok(x).every(key => deepEqual(x[key], y[key]))
  ) : (x === y);
}

const checkParam = (param) => param === null || param === undefined ? '' : param.toString();

@Injectable()
export class TrainersService {
  constructor(private http: HttpClient) {
  }

  trainersGetQuery: GetTrainersQuery;
  trainersCollection: CollectionResponse<TrainerResponse> & ErrorResponse;
  trainerWorkExperienceList: TrainerWorkExperienceResponse[] & ErrorResponse;
  selectedTrainer: TrainerResponse & ErrorResponse;
  trainerId: number;

  get(query: GetTrainersQuery): Observable<CollectionResponse<TrainerResponse> & ErrorResponse> {

    if (this.trainersCollection && this.trainersCollection.items.length > 0 && deepEqual(this.trainersGetQuery, query)) {
      return of(this.trainersCollection);
    }
    let parameters = new HttpParams();

    if (query.feedbacksMinCount) {
      parameters = parameters.append('feedbacksMinCount', checkParam(query.feedbacksMinCount));
    }
    if (query.maxPrice) {
      parameters = parameters.append('maxPrice', checkParam(query.maxPrice));
    }
    if (query.minPrice) {
      parameters = parameters.append('minPrice', checkParam(query.minPrice));
    }
    if (query.trainingsMaxCount) {
      parameters = parameters.append('trainingsMaxCount', checkParam(query.trainingsMaxCount));
    }
    if (query.search) {
      parameters = parameters.append('search', checkParam(query.search));
    }
    if (query.offset) {
      parameters = parameters.append('offset', checkParam(query.offset));
    }
    if (query.count) {
      parameters = parameters.append('count', checkParam(query.count));
    }
    if (query.country) {
      parameters = parameters.append('country', checkParam(query.country));
    }
    if (query.city) {
      parameters = parameters.append('city', checkParam(query.city));
    }
    if (query.teamId) {
      parameters = parameters.append('teamId', checkParam(query.teamId));
    }
    if (query.trainingsMinCount) {
      parameters = parameters.append('trainingsMinCount', checkParam(query.trainingsMinCount));
    }
    if (query.feedbacksMaxCount) {
      parameters = parameters.append('feedbacksMaxCount', checkParam(query.feedbacksMaxCount));
    }
    if (query.workExperienceFrom) {
      parameters = parameters.append('workExperienceFrom', checkParam(query.workExperienceFrom));
    }
    if (query.workExperienceTo) {
      parameters = parameters.append('workExperienceTo', checkParam(query.workExperienceTo));
    }

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

  getWorkExperienceByTrainerId(trainerId: number): Observable<TrainerWorkExperienceResponse[] & ErrorResponse> {

    if (trainerId === undefined || trainerId === null) {
      throw new Error('Param "trainerId" is required');
    }

    if (this.trainerWorkExperienceList && this.trainerWorkExperienceList.length > 0 && this.trainerId === +trainerId) {
      return of(this.trainerWorkExperienceList);
    }

    return this.http.get<TrainerWorkExperienceResponse[] & ErrorResponse>(`/api/trainers/${trainerId}/experience`)
      .pipe(tap((response) => {
        if (!response.error) {
          this.trainerId = +trainerId;
          this.trainerWorkExperienceList = response;
        }
      }));
  }

  updateWorkExperienceByTrainerId(trainerId: number, workExperience: any[]): Observable<TrainerWorkExperienceResponse[] & ErrorResponse> {

    if (trainerId === undefined || trainerId === null) {
      throw new Error('Param "trainerId" is required');
    }

    return this.http.put<TrainerWorkExperienceResponse[] & ErrorResponse>(`/api/trainers/${trainerId}/experience`, {workExperience: workExperience})
      .pipe(tap((response) => {
        if (!response.error) {
          this.trainerId = +trainerId;
          this.trainerWorkExperienceList = response;
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

          if (this.trainersCollection && this.trainersCollection.items.some(trainer => trainer.id === +this.selectedTrainer.id)) {
            const trainer = this.trainersCollection.items.find(s => s.id === this.selectedTrainer.id);
            Object.assign(trainer, response);
          }
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

          if (this.trainersCollection && this.trainersCollection.items.some(trainer => trainer.id === +this.selectedTrainer.id)) {
            const trainer = this.trainersCollection.items.find(s => s.id === this.selectedTrainer.id);
            Object.assign(trainer, response);
          }
        }
      }));
  }

  updateAbout(about: string): Observable<TrainerResponse & ErrorResponse> {
    return this.http.put<TrainerResponse & ErrorResponse>(`/api/trainers/about`, {about: about})
      .pipe(tap((response) => {
        if (!response.error) {
          this.selectedTrainer = response;

          if (this.trainersCollection && this.trainersCollection.items.some(trainer => trainer.id === +this.selectedTrainer.id)) {
            const trainer = this.trainersCollection.items.find(s => s.id === this.selectedTrainer.id);
            Object.assign(trainer, response);
          }
        }
      }));
  }

  updatePaid(price: number): Observable<TrainerResponse & ErrorResponse> {
    return this.http.put<TrainerResponse & ErrorResponse>(`/api/trainers/price`, {price: price})
      .pipe(tap((response) => {
        if (!response.error) {
          this.selectedTrainer = response;

          if (this.trainersCollection && this.trainersCollection.items.some(trainer => trainer.id === +this.selectedTrainer.id)) {
            const trainer = this.trainersCollection.items.find(s => s.id === this.selectedTrainer.id);
            Object.assign(trainer, response);
          }
        }
      }));
  }

  getTrainings(trainerId: number, startDate: string, endDate: string): Observable<CollectionResponse<TrainingResponse>> {
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

          if (this.trainersCollection && this.trainersCollection.items.some(trainer => trainer.id === +this.selectedTrainer.id)) {
            const trainer = this.trainersCollection.items.find(s => s.id === this.selectedTrainer.id);
            Object.assign(trainer, response);
          }
        }
      }));
  }
}
