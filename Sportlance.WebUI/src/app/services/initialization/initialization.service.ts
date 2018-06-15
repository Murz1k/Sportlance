import {Injectable} from '@angular/core';

@Injectable()
export class InitializationService {

  public isAppInitialized: boolean;

  constructor() {
  }

  public async initializeAsync(): Promise<void> {
    this.isAppInitialized = true;
  }
}
