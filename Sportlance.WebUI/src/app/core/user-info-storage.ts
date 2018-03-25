import {Injectable, EventEmitter} from "@angular/core";
import {LoginResponse} from "../services/login-response";
import {StorageUtils} from "./storage-utils";

@Injectable()
export class UserInfoStorage {

  public userInfoChanged: EventEmitter<any> = new EventEmitter<any>();

  readonly UserKey = "user";

  get userInfo(): LoginResponse {
    return StorageUtils.getItem(this.UserKey);
  }

  set userInfo(v: LoginResponse) {
    StorageUtils.setItem(this.UserKey, v);
    this.userInfoChanged.emit(true);
  }

  get token(): string {
    return this.userInfo && this.userInfo.token || null;
  }

  get email(): string {
    return this.userInfo && this.userInfo.email || null;
  }

  public updateAuth(token: string) {
    const userInfo = this.userInfo;
    userInfo.token = token;
    this.userInfo = userInfo;
  }
}


