import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from "../core/auth/auth.service";

@Injectable()
export class RedirectInviteResolver implements Resolve<any> {
  service: AuthService;
  constructor(private router: Router, private injector: Injector) {
    this.service = this.injector.get(AuthService);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.service.getUserByInviteLink(route.params['link'])
      .pipe(map((response: any) => {
      if (response.error) {
        this.router.navigate(['']);
        return null;
      }
      return response;
    }));
  }
}
