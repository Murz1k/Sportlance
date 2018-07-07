import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BaseService} from '../common/base-service';
import {CollectionResponse} from '../common/collection-response';
import {isNullOrUndefined} from 'util';
import {TrainerListItemResponse} from './responses/trainer-list-item-response';
import {GetTrainersQuery} from '../trainers/get-trainers-query';
import {TeamProfileResponse} from './responses/team-profile-response';
import {TeamPhotoResponse} from "./responses/team-photo-response";

@Injectable()
export class TeamsService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  getAsync(query: GetTrainersQuery): Promise<CollectionResponse<TrainerListItemResponse>> {
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
    return this.http.get<CollectionResponse<TrainerListItemResponse>>(`${this.baseApiUrl}/teams`, {params: parameters}).toPromise();
  }

  getByIdAsync(teamId: number): Promise<TeamProfileResponse> {
    return this.http.get<TeamProfileResponse>(`${this.baseApiUrl}/teams/${teamId}`).toPromise();
  }

  getPhotosByTeamIdAsync(teamId: number): Promise<CollectionResponse<TeamPhotoResponse>> {
    return this.http.get<CollectionResponse<TeamPhotoResponse>>(`${this.baseApiUrl}/teams/${teamId}/photos`).toPromise();
  }
  async addPhotoAsync(teamId: number, photo: Blob): Promise<void> {
    const data = new FormData();
    data.append('photo', photo);
    await this.http.post(`${this.baseApiUrl}/teams/${teamId}/photos`, data).toPromise();
  }
  //
  // getSelfAsync(): Promise<TrainerProfileResponse> {
  //   return this.http.get<TrainerProfileResponse>(`${this.baseApiUrl}/trainers/self`).toPromise();
  // }
  //
  // async uploadPhotoAsync(photo: Blob): Promise<void> {
  //   const data = new FormData();
  //   data.append('photo', photo);
  //   await this.http.put(`${this.baseApiUrl}/trainers/photo`, data).toPromise();
  // }
  //
  // setAvailabilityAsync(isAvailable: boolean) {
  //   return this.http.post(`${this.baseApiUrl}/trainers/availability`, {isAvailable: isAvailable}).toPromise();
  // }
  //
  // updateAboutAsync(about: string) {
  //   return this.http.put(`${this.baseApiUrl}/trainers/about`, {about: about}).toPromise();
  // }
  //
  // updatePaidAsync(price: number) {
  //   return this.http.put(`${this.baseApiUrl}/trainers/price`, {price: price}).toPromise();
  // }
}
