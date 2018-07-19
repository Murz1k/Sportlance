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
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TeamsService extends BaseService {
  constructor(private http: HttpClient) {
    super();
  }

  private checkParam(param): string {
    return isNullOrUndefined(param) ? '' : param.toString();
  }

  get(query: GetTeamQuery): Observable<CollectionResponse<TeamResponse>> {
    const parameters = new HttpParams()
      .append('userId', this.checkParam(query.userId))
      .append('offset', this.checkParam(query.offset))
      .append('searchString', this.checkParam(query.searchString))
      .append('country', this.checkParam(query.country))
      .append('city', this.checkParam(query.city))
      .append('count', this.checkParam(query.count));
    return this.http.get<CollectionResponse<TeamResponse>>(`${this.baseApiUrl}/teams`, {params: parameters});
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
    return this.http.post(`${this.baseApiUrl}/teams`, data);
  }

  getSelfAsync(query: GetTeamQuery): Promise<CollectionResponse<TeamResponse>> {
    const parameters = new HttpParams()
      .append('offset', this.checkParam(query.offset))
      .append('count', this.checkParam(query.count));
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
    return this.http.post(`${this.baseApiUrl}/teams/${teamId}/members`, <InviteMemberRequest>{memberId: memberId}).toPromise();
  }
}
