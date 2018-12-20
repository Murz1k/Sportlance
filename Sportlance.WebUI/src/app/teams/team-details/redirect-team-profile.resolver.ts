import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {TeamsService} from '../teams.service';
import {TeamProfileResponse} from '../../shared/teams/responses/team-profile-response';
import {map} from 'rxjs/operators';
import {Paths} from '../../core/paths';

@Injectable()
export class RedirectTeamProfileResolver implements Resolve<TeamProfileResponse> {
  service: TeamsService;
  constructor(private router: Router, private injector: Injector) {
    this.service = this.injector.get(TeamsService);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TeamProfileResponse> {
    return this.service.getById(route.params['id'])
      .pipe(map((response: any) => {
      if (response.error) {
        return this.router.navigate([Paths.Teams]);
      }
      return response;
    }));
  }
}
