import {Injectable} from '@angular/core';
import {UserApiClient} from "../../api/user/user-api.client";
import {User} from "./user";

@Injectable()
export class UserService {

  public currentUser: User;

  constructor(private userApiClient: UserApiClient) {
  }

  public async initializeAsync(): Promise<void> {
    const response = await this.userApiClient.getCurrentAsync();
    this.currentUser = <User>{lastName: response.lastName, email: response.email, firstName: response.firstName};
  }
}
