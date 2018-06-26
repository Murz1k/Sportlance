import {EventEmitter, Injectable} from '@angular/core';
import {LoginResponse} from './auth/responses/login-response';
import {UserInfoStorage} from '../core/user-info-storage';
import {User} from './user.service/user';
import {Paths} from "../core/paths";
import {Observable, Subscription} from "rxjs/Rx";
import {isNullOrUndefined} from "util";
import {Router} from "@angular/router";

@Injectable()
export class AccountService {

  private backgroundChecker: Subscription;

  constructor(private userInfoStorage: UserInfoStorage,
              private router: Router) {
    this.userInfoStorage.userInfoChanged.subscribe((user) => {
      if (user == null) {
        this.stopBackgroundChecker();
        this.router.navigate([Paths.Root]);
      }
    });
  }

  public async initializeAsync(): Promise<void> {
    if (this.isAuthorized) {
      this.startBackgroundChecker();
    }
  }

  get isAuthorized(): boolean {
    return this.userInfoStorage.getCurrentUser() != null;
  }

  public login(userInfo: LoginResponse) {
    this.userInfoStorage.saveCurrentUser(<User>{
      token: userInfo.token,
      isConfirmed: userInfo.isConfirmed,
      email: userInfo.email,
      firstName: userInfo.firstName,
      secondName: userInfo.secondName,
      roles: userInfo.roles
    });
  }

  public logout() {
    this.userInfoStorage.deleteCurrentUser();
  }

  private startUserSession(newUser: User) {
    const user = this.userInfoStorage.getCurrentUser();
    // if (user != null && user.account === newUser.account && user.email === newUser.email && user.signature === newUser.signature) {
    //   return;
    // }
    this.userInfoStorage.saveCurrentUser(newUser);
    this.startBackgroundChecker();
  }


  private startBackgroundChecker() {
    if (!isNullOrUndefined(this.backgroundChecker) && !this.backgroundChecker.closed) {
      return;
    }
    this.backgroundChecker = Observable.interval(3 * 1000)
      .map(async () => this.checkCurrentAuthStateAsync())
      .subscribe();
  }

  private stopBackgroundChecker() {
    if (!isNullOrUndefined(this.backgroundChecker) && !this.backgroundChecker.closed) {
      this.backgroundChecker.unsubscribe();
    }
  }
  private async checkCurrentAuthStateAsync(): Promise<void> {
    // let user = this.userContext.getCurrentUser();
    // if (isNullOrUndefined(user)) {
    //   this.userContext.deleteCurrentUser();
    // }
    //
    // const savedSignature = this.userContext.getSignatureByAccount(currentAccount);
    // if (await this.checkSignatureAsync(currentAccount, savedSignature)) {
    //   user = await this.authenticateOnBackendAsync(currentAccount, savedSignature, AuthenticationService.MESSAGE_TO_SIGN);
    //   this.userContext.saveCurrentUser(user);
    // } else {
    //   this.userContext.deleteCurrentUser();
    // }
  }
}



