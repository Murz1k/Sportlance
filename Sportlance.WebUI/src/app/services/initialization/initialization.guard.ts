import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {InitializationService} from "./initialization.service";
import {Paths} from "../../paths";
import {EmailConfirmationGuard} from "../../guards/email-confirmation-guard";
import {UserInfoStorage} from "../../core/user-info-storage";

@Injectable()
export class InitializationGuard implements CanActivate {
  constructor(private router: Router,
              private initializationService: InitializationService,
              private userInfoStorage: UserInfoStorage) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userInfoStorage.token) {
      if (this.userInfoStorage.isConfirmed) {
        return Promise.resolve(true);
      } else {
        this.router.navigate([Paths.EmailVerify]);
        return Promise.resolve(false);
      }
    }

    if (this.initializationService.isAppInitialized) {
      return true;
    }

    this.router.navigate([Paths.Initialization], {queryParams: {returnUrl: state.url}});
    return Promise.resolve(false);
  }
}
