import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {UserInfoStorage} from '../core/user-info-storage';
import {Paths} from '../core/paths';

@Injectable()
export class EmailConfirmationGuard implements CanActivate {
  constructor(private userInfoStorage: UserInfoStorage,
              private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Promise<boolean> {
    const user = this.userInfoStorage.getCurrentUser();
    if (user.token) {
      if (user.isConfirmed) {
        return Promise.resolve(true);
      } else {
        this.router.navigate([Paths.Root]);
      }
    }
    this.router.navigate([Paths.Initialization], {queryParams: {returnUrl: state.url}});
    return Promise.resolve(false);
  }
}
