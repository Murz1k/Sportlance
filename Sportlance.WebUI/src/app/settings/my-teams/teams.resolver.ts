import {TeamResponse} from '../../services/teams/requests/team-response';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {TeamsService} from '../../services/teams/teams.service';
import {GetTeamQuery} from '../../services/teams/requests/get-team-query';
import {CollectionResponse} from '../../services/common/collection-response';

@Injectable()
export class TeamsResolver implements Resolve<CollectionResponse<TeamResponse>> {
  service: TeamsService;
  constructor(private injector: Injector) {
    this.service = this.injector.get(TeamsService);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CollectionResponse<TeamResponse>>|any {
    return this.service.getSelf(<GetTeamQuery>{ count: 10, offset: 0 });
  }
}
