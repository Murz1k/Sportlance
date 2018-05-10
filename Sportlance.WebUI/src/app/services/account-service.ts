import {EventEmitter, Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {LoginResponse} from './login-response';
import {UserInfoStorage} from '../core/user-info-storage';
import {ProfileApiClient} from '../api/profile/profile-api-client';
import {User} from './user.service/user';

@Injectable()
export class AccountService {
  public readonly RoleAdmin = 'Administrator';
  readonly Authorization = 'Authorization';
  readonly AuthorizationKey = 'auth-token';

  public authStatusChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor(private userInfoStorage: UserInfoStorage,
              private profileApiClient: ProfileApiClient) {
    userInfoStorage.userInfoChanged.subscribe(() => this.initServicesAuthHeader());
  }


  get isAuthorized(): boolean {
    return this.userInfoStorage.userInfo != null;
  }

  public initServicesAuthHeader() {
    const token = this.userInfoStorage.token;
    if (token) {
      this.profileApiClient.defaultHeaders = new HttpHeaders().set(this.Authorization, 'Bearer ' + token);
    }
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



