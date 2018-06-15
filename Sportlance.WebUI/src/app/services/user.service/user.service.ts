import {Injectable} from '@angular/core';
import {User} from './user';
import {UserInfoStorage} from '../../core/user-info-storage';

@Injectable()
export class UserService {

  constructor(private userStorage: UserInfoStorage) {
  }

  public getCurrent(): User {
    return this.userStorage.userInfo;
  }
}
