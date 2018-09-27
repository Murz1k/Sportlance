import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CollectionResponse} from '../common/collection-response';
import {isNullOrUndefined} from 'util';
import {TeamProfileResponse} from './responses/team-profile-response';
import {TeamPhotoResponse} from './responses/team-photo-response';
import {InviteMemberRequest} from './requests/invite-member-request';
import {GetTeamQuery} from './requests/get-team-query';
import {TeamResponse} from './requests/team-response';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class TeamsService {
  constructor(private http: HttpClient) {
  }

  private checkParam(param): string {
    return isNullOrUndefined(param) ? '' : param.toString();
  }

  get(query: GetTeamQuery): Observable<CollectionResponse<TeamResponse>> {
    const parameters = new HttpParams()
      .append('offset', this.checkParam(query.offset))
      .append('searchString', this.checkParam(query.searchString))
      .append('country', this.checkParam(query.country))
      .append('city', this.checkParam(query.city))
      .append('count', this.checkParam(query.count));
    return this.http.get<CollectionResponse<TeamResponse>>(`/teams`, {params: parameters});
  }

  getById(teamId: number): Observable<TeamProfileResponse> {
    return this.http.get<TeamProfileResponse>(`/teams/${teamId}`);
  }

  getPhotosByTeamId(teamId: number): Observable<CollectionResponse<TeamPhotoResponse>> {
    return this.http.get<CollectionResponse<TeamPhotoResponse>>(`/teams/${teamId}/photos`);
  }

  deletePhoto(teamId: number, photoId: number) {
    return this.http.delete(`/teams/${teamId}/photos/${photoId}`);
  }

  async addPhotoAsync(teamId: number, photo: Blob): Promise<void> {
    const data = new FormData();
    data.append('photo', photo);
    await this.http.post(`/teams/${teamId}/photos`, data).toPromise();
  }

  add(title: string, subtitle: string, phoneNumber: string, country: string, city: string, about: string, photo: Blob): Observable<Object> {
    const data = new FormData();
    data.append('title', title);
    data.append('subtitle', subtitle);
    data.append('phoneNumber', phoneNumber);
    data.append('country', country);
    data.append('city', city);
    data.append('about', this.checkParam(about));
    if (photo) {
      data.append('photo', photo);
    }
    return this.http.post(`/teams`, data);
  }

  getSelf(query: GetTeamQuery): Observable<CollectionResponse<TeamResponse>> {
    const parameters = new HttpParams()
      .append('offset', this.checkParam(query.offset))
      .append('count', this.checkParam(query.count));
    return this.http.get<CollectionResponse<TeamResponse>>(`/teams/self`, {params: parameters});
  }

  async uploadMainPhotoAsync(teamId: number, photo: Blob): Promise<void> {
    const data = new FormData();
    data.append('photo', photo);
    await this.http.put(`/trainers/photo`, data).toPromise();
  }

  async uploadBackgroundImageAsync(teamId: number, photo: Blob): Promise<void> {
    const data = new FormData();
    data.append('photo', photo);
    await this.http.put(`/trainers/background`, data).toPromise();
  }

  inviteMember(teamId: number, memberId: number) {
    return this.http.post(`/teams/${teamId}/members`, <InviteMemberRequest>{memberId: memberId});
  }
}
