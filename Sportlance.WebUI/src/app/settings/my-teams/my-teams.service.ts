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

  add(title: string, subtitle: string, phoneNumber: string, country: string, city: string, address: string, about: string, photo?: Blob, geo?: any): Observable<Object> {
    if (photo) {
      const data = new FormData();
      data.append('title', title);
      data.append('subtitle', subtitle);
      data.append('phoneNumber', phoneNumber);
      data.append('country', country);
      data.append('city', city);
      data.append('about', this.checkParam(about));
      data.append('photo', photo);
      if (geo) {
        data.append('geo', JSON.stringify(geo));
      }
      return this.http.post(`/api/teams`, data);
    } else {
      return this.http.post(`/api/teams`, {title, subtitle, phoneNumber, country, city, about, geo, address});
    }
  }

  getSelf(query: GetTeamQuery): Observable<CollectionResponse<TeamResponse>> {
    const parameters = new HttpParams()
      .append('offset', this.checkParam(query.offset))
      .append('count', this.checkParam(query.count));
    return this.http.get<CollectionResponse<TeamResponse>>(`/api/teams/self`, {params: parameters});
  }
}
