import {Injectable} from '@angular/core';
import {SportService} from '../sport.service';

@Injectable()
export class InitializationService {

  public isAppInitialized: boolean;

  constructor(private sportService: SportService) {
  }

  public async initializeAsync(): Promise<void> {
    await Promise.all([
      //this.sportService.initializeAsync()
    ]);
    this.isAppInitialized = true;
  }
}
