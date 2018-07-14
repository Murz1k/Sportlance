import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BaseService} from '../common/base-service';
import {CollectionResponse} from '../common/collection-response';
import {isNullOrUndefined} from 'util';
import {TeamProfileResponse} from './responses/team-profile-response';
import {TeamPhotoResponse} from './responses/team-photo-response';
import {InviteMemberRequest} from './requests/invite-member-request';
import {GetTeamQuery} from './requests/get-team-query';
import {TeamResponse} from './requests/team-response';

@Injectable()
export class TeamsService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  getAsync(query: GetTeamQuery): Promise<CollectionResponse<TeamResponse>> {
    const checkParam = (param) => isNullOrUndefined(param) ? '' : param.toString();
    const parameters = new HttpParams()
      .append('userId', checkParam(query.userId))
      .append('offset', checkParam(query.offset))
      .append('count', checkParam(query.count));
    return this.http.get<CollectionResponse<TeamResponse>>(`${this.baseApiUrl}/teams`, {params: parameters}).toPromise();
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

  getSelfAsync(query: GetTeamQuery): Promise<CollectionResponse<TeamResponse>> {
    const checkParam = (param) => isNullOrUndefined(param) ? '' : param.toString();
    const parameters = new HttpParams()
      .append('userId', checkParam(query.userId))
      .append('offset', checkParam(query.offset))
      .append('count', checkParam(query.count));
    return this.http.get<CollectionResponse<TeamResponse>>(`${this.baseApiUrl}/teams/self`, {params: parameters}).toPromise();
  }
  async uploadMainPhotoAsync(teamId: number, photo: Blob): Promise<void> {
    const data = new FormData();
    data.append('photo', photo);
    await this.http.put(`${this.baseApiUrl}/trainers/photo`, data).toPromise();
  }

  async uploadBackgroundImageAsync(teamId: number, photo: Blob): Promise<void> {
    const data = new FormData();
    data.append('photo', photo);
    await this.http.put(`${this.baseApiUrl}/trainers/background`, data).toPromise();
  }
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

  inviteMemberAsync(teamId: number, memberId: number) {
    return this.http.post(`${this.baseApiUrl}/teams/${teamId}/members`, <InviteMemberRequest>{ memberId: memberId}).toPromise();
  }
}
