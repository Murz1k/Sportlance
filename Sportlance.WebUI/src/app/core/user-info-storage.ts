import {Injectable, EventEmitter} from '@angular/core';
import {User} from '../services/user.service/user';

@Injectable()
export class UserInfoStorage {

  public userInfoChanged: EventEmitter<any> = new EventEmitter<any>();

  readonly UserKey = 'user';

  public getCurrentUser(): User {
    const userOptions = JSON.parse(localStorage.getItem(this.UserKey));
    let user = null;
    if (userOptions) {
      user = new User(
        userOptions.firstName,
        userOptions.secondName,
        userOptions.token,
        userOptions.roles,
        userOptions.email,
        userOptions.isConfirmed
      );
    }
    return user;
  }

  public saveCurrentUser(user: User) {
    if (this.isCurrentUserEquals(user)) {
      return;
    }
    localStorage.setItem(this.UserKey, JSON.stringify(user));
    this.userInfoChanged.emit(this.getCurrentUser());
  }

  public deleteCurrentUser() {
    localStorage.removeItem(this.UserKey);
    this.userInfoChanged.emit(null);
  }

  private isCurrentUserEquals(user: User): boolean {
    const currentUser = this.getCurrentUser();
    if (currentUser != null && user.firstName === currentUser.firstName
      && user.secondName === currentUser.secondName
      && user.token === currentUser.token
      && user.roles.length === currentUser.roles.length
      && user.roles.every((v, i) => v === currentUser.roles[i])) {
      return true;
    }
    return false;
  }
}


