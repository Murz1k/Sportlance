import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {InitializationService} from '../services/initialization/initialization.service';
import {Paths} from '../paths';
import {UserInfoStorage} from '../core/user-info-storage';

@Injectable()
export class InitializationGuard implements CanActivate {
  constructor(private router: Router,
              private initializationService: InitializationService,
              private userInfoStorage: UserInfoStorage) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.initializationService.isAppInitialized) {
      return true;
    }

    this.router.navigate([Paths.Initialization], {queryParams: {returnUrl: state.url}});
    return Promise.resolve(false);
  }
}
