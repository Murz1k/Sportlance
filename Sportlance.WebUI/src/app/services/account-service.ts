import {AuthApiClient} from "./auth-api-client";
import {EventEmitter, Injectable} from "@angular/core";
import {HttpHeaders} from '@angular/common/http';
import {StorageUtils} from "../core/storage-utils";
import {LoginResponse} from "./login-response";
import {UserInfoStorage} from "../core/user-info-storage";
import {isNullOrUndefined} from "util";
import {ProfileApiClient} from "../api/profile/profile-api-client";
import {UserService} from "./user.service/user.service";

@Injectable()
export class AccountService {
  public readonly RoleAdmin = "Administrator";
  readonly Authorization = "Authorization";
  readonly AuthorizationKey = "auth-token";

  public authStatusChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor(private userInfoStorage: UserInfoStorage,
              private authApiClient: AuthApiClient,
              private profileApiClient: ProfileApiClient,
              private userService: UserService) {
    userInfoStorage.userInfoChanged.subscribe(() => this.initServicesAuthHeader());
  }


  get isAuthorized(): boolean {
    return this.userInfoStorage.token != null;
  }

  public async initilizeAsync(): Promise<void> {
    if (this.isAuthorized) {
      await this.userService.initializeAsync();
      this.authStatusChanged.emit(true);
    }
  }

  public initServicesAuthHeader() {
    const token = this.userInfoStorage.token;
    if (token) {
      this.profileApiClient.defaultHeaders = new HttpHeaders().set(this.Authorization, "Bearer " + token);
    }
    this.authStatusChanged.emit(true);
  }

  public login(userInfo: LoginResponse) {
    this.userInfoStorage.userInfo = userInfo;
    this.authStatusChanged.emit(true);
  }

  public logout() {
    this.userInfoStorage.userInfo = null;
    this.authStatusChanged.emit(false);
  }
}



