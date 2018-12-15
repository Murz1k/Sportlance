import {TeamResponse} from '../../shared/teams/requests/team-response';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {GetTeamQuery} from '../../shared/teams/requests/get-team-query';
import {CollectionResponse} from '../../core/collection-response';
import {MyTeamsService} from './my-teams.service';

@Injectable()
export class TeamsResolver implements Resolve<CollectionResponse<TeamResponse>> {
  service: MyTeamsService;
  constructor(private injector: Injector) {
    this.service = this.injector.get(MyTeamsService);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CollectionResponse<TeamResponse>>|any {
    return this.service.getSelf(<GetTeamQuery>{ count: 10, offset: 0 });
  }
}
