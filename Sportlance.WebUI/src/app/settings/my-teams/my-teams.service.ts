import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CollectionResponse} from '../../core/collection-response';
import {isNullOrUndefined} from 'util';
import {Observable} from 'rxjs/internal/Observable';
import {TeamResponse} from '../../shared/teams/requests/team-response';
import {GetTeamQuery} from '../../shared/teams/requests/get-team-query';

@Injectable()
export class MyTeamsService {
  constructor(private http: HttpClient) {
  }

  private checkParam(param): string {
    return isNullOrUndefined(param) ? '' : param.toString();
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
}
