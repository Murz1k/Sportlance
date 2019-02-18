import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {TeamsService} from '../teams.service';
import {TeamProfileResponse} from '../../shared/teams/responses/team-profile-response';
import {tap} from 'rxjs/operators';

@Injectable()
export class RedirectTeamProfileResolver implements Resolve<TeamProfileResponse> {
  service: TeamsService;
  constructor(private router: Router, private injector: Injector) {
    this.service = this.injector.get(TeamsService);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TeamProfileResponse> {
    return this.service.getById(route.params['id'])
      .pipe(tap((response: any) => {
      if (response.error) {
        return this.router.navigate(['/teams']);
      }
      return response;
    }));
  }
}
