import {Injectable} from '@angular/core';
import {LoginResponse} from './auth/responses/login-response';
import {User} from './user.service/user';
import {Paths} from '../core/paths';
import {Router} from '@angular/router';
import {UserService} from './user.service/user.service';

@Injectable()
export class AccountService {

  constructor(private userService: UserService,
              private router: Router) {
    this.userService.userInfoChanged.subscribe((user) => {
      if (user == null) {
        return this.router.navigate([Paths.Root]);
      }
    });
  }

  get isAuthorized(): boolean {
    return this.userService.getToken() != null;
  }

  public login(userInfo: LoginResponse) {
    this.userService.saveCurrentUser(<User>{
      isConfirmed: userInfo.isConfirmed,
      email: userInfo.email,
      firstName: userInfo.firstName,
      secondName: userInfo.secondName,
      roles: userInfo.roles
    });
  }

  public logout() {
    this.userService.deleteCurrentUser();
  }
}



