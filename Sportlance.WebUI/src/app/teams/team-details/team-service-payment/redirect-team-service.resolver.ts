import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {TeamsService} from "../../teams.service";
import {TeamServiceResponse} from "../../../shared/teams/responses/team-service-response";

@Injectable()
export class RedirectTeamServiceResolver implements Resolve<TeamServiceResponse> {
  service: TeamsService;
  constructor(private router: Router, private injector: Injector) {
    this.service = this.injector.get(TeamsService);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TeamServiceResponse> {
    return this.service.getServiceById(route.params['id'], route.params['serviceId'])
      .pipe(tap((response: any) => {
      if (response.error) {
        return this.router.navigate(['/teams',route.params['id']]);
      }
      return response;
    }));
  }
}
