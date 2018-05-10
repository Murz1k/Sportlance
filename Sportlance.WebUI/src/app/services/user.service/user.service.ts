import {Injectable} from '@angular/core';
import {UserApiClient} from "../../api/user/user-api.client";
import {User} from "./user";
import {UserInfoStorage} from "../../core/user-info-storage";
import {LoginResponse} from "../login-response";

@Injectable()
export class UserService {

  constructor(private userStorage: UserInfoStorage) {
  }

  public getCurrent(): User {
    return this.userStorage.userInfo;
  }
}
