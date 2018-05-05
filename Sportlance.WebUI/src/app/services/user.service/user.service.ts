import {Injectable} from '@angular/core';
import {UserApiClient} from "../../api/user/user-api.client";
import {User} from "./user";

@Injectable()
export class UserService {

  private currentUser: User;

  constructor(private userApiClient: UserApiClient) {
  }

  public async initializeAsync(): Promise<void> {
    const response = await this.userApiClient.getCurrentAsync();
    this.currentUser = <User>{lastName: response.lastName, email: response.email, firstName: response.firstName};
  }

  public async getCurrentAsync(): Promise<User> {
    if (this.currentUser) {
      return this.currentUser;
    }
    const response = await this.userApiClient.getCurrentAsync();
    return <User>{lastName: response.lastName, email: response.email, firstName: response.firstName};
  }
}
