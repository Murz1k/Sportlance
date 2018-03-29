import { Injectable } from '@angular/core';
import {SportService} from "../sport.service";
import {UserService} from "../user.service/user.service";

@Injectable()
export class InitializationService {

  public isAppInitialized: boolean;

  constructor(private sportService: SportService,
              private userService: UserService) { }

  public async initializeAsync(): Promise<void>{
    await Promise.all([
      this.sportService.initializeAsync(),
      this.userService.initializeAsync()
    ]);
    this.isAppInitialized = true;
  }
}
