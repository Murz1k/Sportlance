import {Injectable, EventEmitter} from '@angular/core';
import {StorageUtils} from './storage-utils';
import {User} from '../services/user.service/user';

@Injectable()
export class UserInfoStorage {

  public userInfoChanged: EventEmitter<any> = new EventEmitter<any>();

  readonly UserKey = 'user';

  get userInfo(): User {
    return StorageUtils.getItem(this.UserKey);
  }

  set userInfo(v: User) {
    StorageUtils.setItem(this.UserKey, v);
    this.userInfoChanged.emit(true);
  }

  get token(): string {
    return this.userInfo && this.userInfo.token || null;
  }

  get email(): string {
    return this.userInfo && this.userInfo.email || null;
  }

  get isConfirmed(): boolean {
    return this.userInfo && this.userInfo.isConfirmed || false;
  }

  public updateAuth(token: string) {
    const userInfo = this.userInfo;
    userInfo.token = token;
    this.userInfo = userInfo;
  }

  public saveCurrentUser(user: User) {

    localStorage.setItem(this.UserKey, JSON.stringify(user));
    this.userInfoChanged.emit(user);
  }
}


