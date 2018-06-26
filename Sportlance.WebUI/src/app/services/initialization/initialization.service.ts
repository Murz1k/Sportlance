import {Injectable} from '@angular/core';
import {AccountService} from "../account-service";
import {PromiseUtils} from "../../core/promise-utils";

@Injectable()
export class InitializationService {

  public isAppInitialized: boolean;

  constructor(private accountService: AccountService) {
  }

  public async initializeAsync(): Promise<void> {
    if (this.isAppInitialized) {
      return;
    }
    await Promise.all([this.initializeAppInternalAsync(), this.waitAsync()]);
    this.isAppInitialized = true;
  }

  private async initializeAppInternalAsync(): Promise<void> {
    await Promise.all([
      this.accountService.initializeAsync()
    ]);
  }

  private async waitAsync(): Promise<void> {
    await PromiseUtils.delay(1 * 1000);
  }
}
