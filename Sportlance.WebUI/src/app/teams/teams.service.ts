import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CollectionResponse} from '../core/collection-response';
import {isNullOrUndefined} from 'util';
import {TeamPhotoResponse} from '../shared/teams/responses/team-photo-response';
import {InviteMemberRequest} from '../shared/teams/requests/invite-member-request';
import {GetTeamQuery} from '../shared/teams/requests/get-team-query';
import {TeamResponse} from '../shared/teams/requests/team-response';
import {Observable} from 'rxjs/internal/Observable';
import {TeamServiceResponse} from "../shared/teams/responses/team-service-response";
import {ErrorResponse} from "../core/error-response";
import {UpdateTeamServiceRequest} from "../shared/teams/requests/update-team-service-request";
import {TeamServiceOrderResponse} from "../shared/teams/responses/team-service-order-response";
import {tap} from "rxjs/operators";
import {of} from "rxjs";

function deepEqual(x, y) {
  const ok = Object.keys, tx = typeof x, ty = typeof y;
  return x && y && tx === 'object' && tx === ty ? (
    ok(x).length === ok(y).length &&
    ok(x).every(key => deepEqual(x[key], y[key]))
  ) : (x === y);
}

@Injectable()
export class TeamsService {
  constructor(private http: HttpClient) {
  }

  private checkParam(param): string {
    return isNullOrUndefined(param) ? '' : param.toString();
  }

  teamsGetQuery: GetTeamQuery;
  teamsCollection: CollectionResponse<TeamResponse> & ErrorResponse;

  get(query: GetTeamQuery): Observable<CollectionResponse<TeamResponse> & ErrorResponse> {

    if (this.teamsCollection && this.teamsCollection.items.length > 0 && deepEqual(this.teamsGetQuery, query)) {
      return of(this.teamsCollection);
    }

    const parameters = new HttpParams()
      .append('offset', this.checkParam(query.offset))
      .append('searchString', this.checkParam(query.searchString))
      .append('country', this.checkParam(query.country))
      .append('city', this.checkParam(query.city))
      .append('count', this.checkParam(query.count));

    return this.http.get<CollectionResponse<TeamResponse> & ErrorResponse>(`/teams`, {params: parameters})
      .pipe(tap((response) => {
        if (!response.error) {
          this.teamsGetQuery = query;
          this.teamsCollection = response;
        }
      }));
  }

  selectedTeam: TeamResponse & ErrorResponse;

  getById(teamId: number): Observable<TeamResponse & ErrorResponse> {

    if (teamId === undefined || teamId === null) {
      throw new Error('Param "teamId" is required');
    }

    if (this.teamsCollection && this.teamsCollection.items.some(team => team.id === +teamId)) {
      this.selectedTeam = <TeamResponse & ErrorResponse>this.teamsCollection.items.find(team => team.id === +teamId);
    }

    if (this.selectedTeam && this.selectedTeam.id === +teamId) {
      return of(this.selectedTeam);
    }

    return this.http.get<TeamResponse & ErrorResponse>(`/teams/${teamId}`)
      .pipe(tap((response) => {
        if (!response.error) {
          this.selectedTeam = response;
        }
      }));
  }

  canInviteTrainer(teamId: number, trainerId: number): Observable<boolean> {
    if (teamId === undefined || teamId === null) {
      throw new Error('Param "teamId" is required');
    }
    if (trainerId === undefined || trainerId === null) {
      throw new Error('Param "trainerId" is required');
    }
    return this.http.get<boolean>(`/teams/${teamId}/trainers/${trainerId}/canInvite`);
  }

  teamPhotoCollection: CollectionResponse<TeamPhotoResponse> & ErrorResponse;

  getPhotosByTeamId(teamId: number): Observable<CollectionResponse<TeamPhotoResponse> & ErrorResponse> {

    if (teamId === undefined || teamId === null) {
      throw new Error('Param "teamId" is required');
    }

    if (this.teamPhotoCollection && this.teamPhotoCollection.items.length > 0 && this.serviceCollectionTeamId === +teamId) {
      return of(this.teamPhotoCollection);
    }

    return this.http.get<CollectionResponse<TeamPhotoResponse> & ErrorResponse>(`/teams/${teamId}/photos`)
      .pipe(tap((response) => {
        if (!response.error) {
          this.serviceCollectionTeamId = +teamId;
          this.teamPhotoCollection = response;
        }
      }));
  }

  addService(teamId: number, request: UpdateTeamServiceRequest) {
    if (teamId === undefined || teamId === null) {
      throw new Error('Param "teamId" is required');
    }
    return this.http.post<TeamServiceResponse & ErrorResponse>(`/teams/${teamId}/services`, request)
      .pipe(tap((response) => {
        if (!response.error) {
          this.serviceCollectionTeamId = +teamId;
          if (!this.serviceCollection) {
            this.serviceCollection = <any>{
              items: [],
              count: 10,
              offset: 0,
              totalCount: 0
            };
          }
          this.serviceCollection.items.unshift(response);
          this.serviceCollection.totalCount++;
        }
      }));
  }

  updateService(teamId: number, serviceId: number, request: UpdateTeamServiceRequest) {

    if (teamId === undefined || teamId === null) {
      throw new Error('Param "teamId" is required');
    }
    if (serviceId === undefined || serviceId === null) {
      throw new Error('Param "serviceId" is required');
    }

    return this.http.put<TeamServiceResponse & ErrorResponse>(`/teams/${teamId}/services/${serviceId}`, request)
      .pipe(tap((response) => {
        if (!response.error) {
          this.serviceCollectionTeamId = +teamId;
          const service = this.serviceCollection.items.find(s => s.id === serviceId);
          Object.assign(service, response);
        }
      }));
  }

  deleteService(teamId: number, serviceId: number) {

    if (teamId === undefined || teamId === null) {
      throw new Error('Param "teamId" is required');
    }
    if (serviceId === undefined || serviceId === null) {
      throw new Error('Param "serviceId" is required');
    }

    return this.http.delete<ErrorResponse>(`/teams/${teamId}/services/${serviceId}`)
      .pipe(tap((response) => {
        if (!response) {
          if (this.serviceCollectionTeamId && this.serviceCollectionTeamId === +teamId
            && this.serviceCollection && this.serviceCollection.items.some(service => service.id === +serviceId)) {
            this.serviceCollection.items = this.serviceCollection.items.filter(service => service.id !== +serviceId);
            this.serviceCollection.totalCount--;
          }
        }
      }));
  }

  selectedTeamService: TeamServiceResponse & ErrorResponse;

  getServiceById(teamId: number, serviceId: number): Observable<TeamServiceResponse & ErrorResponse> {

    if (teamId === undefined || teamId === null) {
      throw new Error('Param "teamId" is required');
    }
    if (serviceId === undefined || serviceId === null) {
      throw new Error('Param "serviceId" is required');
    }

    if (this.serviceCollectionTeamId && this.serviceCollectionTeamId === +teamId
      && this.serviceCollection && this.serviceCollection.items.some(service => service.id === +serviceId)) {
      this.selectedTeamService = <TeamServiceResponse & ErrorResponse>this.serviceCollection.items.find(service => service.id === +serviceId);
    }

    if (this.selectedTeamService && this.selectedTeamService.id === +serviceId) {
      return of(this.selectedTeamService);
    }

    return this.http.get<TeamServiceResponse & ErrorResponse>(`/teams/${teamId}/services/${serviceId}`)
      .pipe(tap((response) => {
        if (!response.error) {
          this.selectedTeamService = response;
        }
      }));
  }

  serviceCollectionTeamId: number;
  serviceCollection: CollectionResponse<TeamServiceResponse> & ErrorResponse;

  getServicesByTeamId(teamId: number): Observable<CollectionResponse<TeamServiceResponse> & ErrorResponse> {

    if (teamId === undefined || teamId === null) {
      throw new Error('Param "teamId" is required');
    }

    if (this.serviceCollection && this.serviceCollection.items.length > 0 && this.serviceCollectionTeamId === +teamId) {
      return of(this.serviceCollection);
    }

    return this.http.get<CollectionResponse<TeamServiceResponse> & ErrorResponse>(`/teams/${teamId}/services`)
      .pipe(tap((response) => {
        if (!response.error) {
          this.serviceCollectionTeamId = +teamId;
          this.serviceCollection = response;
        }
      }));
  }

  addTeamServiceOrder(teamId: number, serviceId: number): Observable<TeamServiceOrderResponse & ErrorResponse> {
    if (teamId === undefined || teamId === null) {
      throw new Error('Param "teamId" is required');
    }
    if (serviceId === undefined || serviceId === null) {
      throw new Error('Param "serviceId" is required');
    }
    return this.http.post<TeamServiceOrderResponse & ErrorResponse>(`/orders/team-service`, {
      teamId: teamId,
      serviceId: serviceId
    });
  }

  deletePhoto(teamId: number, photoId: number) {
    return this.http.delete(`/teams/${teamId}/photos/${photoId}`)
      .pipe(tap((response) => {
        if (!response) {
          if (this.teamPhotoCollection && this.teamPhotoCollection.items.some(photo => photo.id === +photoId)) {
            this.teamPhotoCollection.items = this.teamPhotoCollection.items.filter(photo => photo.id !== +photoId);
            this.teamPhotoCollection.totalCount--;
          }
        }
      }));
  }

  addPhoto(teamId: number, photo: Blob): Observable<TeamPhotoResponse & ErrorResponse> {
    const data = new FormData();
    data.append('photo', photo);
    return this.http.post<TeamPhotoResponse & ErrorResponse>(`/teams/${teamId}/photos`, data)
      .pipe(tap((response) => {
        if (!response.error) {
          this.serviceCollectionTeamId = +teamId;
          if (!this.teamPhotoCollection) {
            this.teamPhotoCollection = <any>{
              items: [],
              count: 10,
              offset: 0,
              totalCount: 0
            };
          }
          this.teamPhotoCollection.items.unshift(response);
          this.teamPhotoCollection.totalCount++;
        }
      }));
  }

  getSelf(query: GetTeamQuery): Observable<CollectionResponse<TeamResponse>> {
    const parameters = new HttpParams()
      .append('offset', this.checkParam(query.offset))
      .append('count', this.checkParam(query.count));
    return this.http.get<CollectionResponse<TeamResponse>>(`/teams/self`, {params: parameters});
  }

  updateAbout(teamId: number, about: string): Observable<TeamResponse & ErrorResponse> {
    return this.http.put<TeamResponse & ErrorResponse>(`/teams/${teamId}/about`, {about: about})
      .pipe(tap((response) => {
        if (!response.error) {
          this.serviceCollectionTeamId = +teamId;
          const team = this.teamsCollection.items.find(s => s.id === +teamId);
          Object.assign(team, response);
          Object.assign(this.selectedTeam, response);
        }
      }));
  }

  uploadMainPhoto(teamId: number, photo: Blob): Observable<TeamResponse & ErrorResponse> {
    const data = new FormData();
    data.append('photo', photo);
    return this.http.put<TeamResponse & ErrorResponse>(`/teams/${teamId}/photo`, data)
      .pipe(tap((response) => {
        if (!response.error) {
          this.serviceCollectionTeamId = +teamId;
          const team = this.teamsCollection.items.find(s => s.id === +teamId);
          Object.assign(team, response);
          Object.assign(this.selectedTeam, response);
        }
      }));
  }

  uploadBackgroundImage(teamId: number, photo: Blob): Observable<TeamResponse & ErrorResponse> {
    const data = new FormData();
    data.append('photo', photo);
    return this.http.put<TeamResponse & ErrorResponse>(`/teams/${teamId}/background`, data)
      .pipe(tap((response) => {
        if (!response.error) {
          this.serviceCollectionTeamId = +teamId;
          const team = this.teamsCollection.items.find(s => s.id === +teamId);
          Object.assign(team, response);
          Object.assign(this.selectedTeam, response);
        }
      }));
  }

  inviteMember(teamId: number, memberId: number) {
    return this.http.post(`/teams/${teamId}/members`, <InviteMemberRequest>{memberId: memberId});
  }
}
