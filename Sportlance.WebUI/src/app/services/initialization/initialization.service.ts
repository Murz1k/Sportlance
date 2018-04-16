import {Injectable} from '@angular/core';
import {SportService} from "../sport.service";
import {UserService} from "../user.service/user.service";
import {AccountService} from "../account-service";

@Injectable()
export class InitializationService {

  public isAppInitialized: boolean;

  constructor(private sportService: SportService,
              private accountService: AccountService) {
  }

  public async initializeAsync(): Promise<void> {
    await Promise.all([
      this.accountService.initilizeAsync(),
      this.sportService.initializeAsync()
    ]);
    this.isAppInitialized = true;
  }
}
