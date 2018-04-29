import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {UserInfoStorage} from '../core/user-info-storage';
import {Paths} from "../paths";

@Injectable()
export class EmailConfirmationGuard implements CanActivate {
  constructor(private userInfoStorage: UserInfoStorage,
              private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Promise<boolean> {
    if (this.userInfoStorage.token) {
      if (this.userInfoStorage.isConfirmed) {
        return Promise.resolve(true);
      } else {
        this.router.navigate([Paths.EmailVerify]);
        return Promise.resolve(false);
      }
    }
    this.router.navigate([Paths.Initialization], {queryParams: {returnUrl: state.url}});
    return Promise.resolve(false);
  }
}
