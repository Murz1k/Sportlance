import {EventEmitter, Injectable} from '@angular/core';
import {User} from './user';

@Injectable()
export class UserService {

  public userInfoChanged: EventEmitter<any> = new EventEmitter<any>();

  readonly accessTokenKey = 'access-token';

  constructor() {
  }

  public getCurrent(): User {
    const token = localStorage.getItem(this.accessTokenKey);
    if (!token) {
      return null;
    }
    const userOptions = this.decodeToken(token);
    let user = null;
    if (userOptions) {
      user = new User(
        userOptions.firstName,
        userOptions.secondName,
        userOptions.roles,
        userOptions.email,
        userOptions.isConfirmed,
        userOptions.photoUrl
      );
    }
    return user;
  }

  public saveToken(token: string) {
    //if (this.isCurrentUserEquals(token)) {
    //  return;
    //}
    localStorage.setItem(this.accessTokenKey, token);
    this.userInfoChanged.emit(this.decodeToken(token));
  }

  public getToken(): string {
    return localStorage.getItem(this.accessTokenKey);
  }

  public saveCurrentUser(user: User) {
    if (this.isCurrentUserEquals(user)) {
      return;
    }
    localStorage.setItem(this.accessTokenKey, JSON.stringify(user));
    this.userInfoChanged.emit(user);
  }

  public deleteCurrentUser() {
    localStorage.removeItem(this.accessTokenKey);
    this.userInfoChanged.emit(null);
  }

  private isCurrentUserEquals(user: User): boolean {
    const currentUser = this.getCurrent();
    if (currentUser != null && user.firstName === currentUser.firstName
      && user.secondName === currentUser.secondName
      && user.roles.length === currentUser.roles.length
      && user.roles.every((v, i) => v === currentUser.roles[i])) {
      return true;
    }
    return false;
  }

  private urlBase64Decode(str: string) {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        // tslint:disable-next-line:no-string-throw
        throw 'Illegal base64url string!';
    }
    return decodeURIComponent((<any>window).escape(window.atob(output)));
  }

  public decodeToken(token: string = ''): User | any {
    if (token === null || token === '') {
      return {'upn': ''};
    }
    const parts = token.split('.');
    if (parts.length !== 3) {

      throw new Error('JWT must have 3 parts');
    }
    const decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error('Cannot decode the token');
    }
    return JSON.parse(decoded);
  }
}
