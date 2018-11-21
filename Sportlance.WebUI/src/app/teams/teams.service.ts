import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CollectionResponse} from '../services/common/collection-response';
import {isNullOrUndefined} from 'util';
import {TeamProfileResponse} from '../shared/teams/responses/team-profile-response';
import {TeamPhotoResponse} from '../shared/teams/responses/team-photo-response';
import {InviteMemberRequest} from '../shared/teams/requests/invite-member-request';
import {GetTeamQuery} from '../shared/teams/requests/get-team-query';
import {TeamResponse} from '../shared/teams/requests/team-response';
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

  addPhoto(teamId: number, photo: Blob) {
    const data = new FormData();
    data.append('photo', photo);
    return this.http.post(`/teams/${teamId}/photos`, data);
  }

  getSelf(query: GetTeamQuery): Observable<CollectionResponse<TeamResponse>> {
    const parameters = new HttpParams()
      .append('offset', this.checkParam(query.offset))
      .append('count', this.checkParam(query.count));
    return this.http.get<CollectionResponse<TeamResponse>>(`/teams/self`, {params: parameters});
  }

  uploadMainPhoto(teamId: number, photo: Blob) {
    const data = new FormData();
    data.append('photo', photo);
    return this.http.put(`/trainers/photo`, data);
  }

  uploadBackgroundImage(teamId: number, photo: Blob) {
    const data = new FormData();
    data.append('photo', photo);
    return this.http.put(`/trainers/background`, data);
  }

  inviteMember(teamId: number, memberId: number) {
    return this.http.post(`/teams/${teamId}/members`, <InviteMemberRequest>{memberId: memberId});
  }
}
