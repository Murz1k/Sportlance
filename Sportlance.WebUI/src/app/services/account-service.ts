import {EventEmitter, Injectable} from '@angular/core';
import {LoginResponse} from './auth/responses/login-response';
import {UserInfoStorage} from '../core/user-info-storage';
import {User} from './user.service/user';

@Injectable()
export class AccountService {
  public authStatusChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor(private userInfoStorage: UserInfoStorage) {
    userInfoStorage.userInfoChanged.subscribe(() => this.initServicesAuthHeader());
  }

  get isAuthorized(): boolean {
    return this.userInfoStorage.userInfo != null;
  }

  public initServicesAuthHeader() {
    this.authStatusChanged.emit(true);
  }

  public login(userInfo: LoginResponse) {
    this.userInfoStorage.userInfo = <User>{
      token: userInfo.token,
      isConfirmed: userInfo.isConfirmed,
      email: userInfo.email,
      firstName: userInfo.firstName,
      secondName: userInfo.secondName,
      roles: userInfo.roles
    };
    this.authStatusChanged.emit(true);
  }

  public logout() {
    this.userInfoStorage.userInfo = null;
    this.authStatusChanged.emit(false);
  }
}



