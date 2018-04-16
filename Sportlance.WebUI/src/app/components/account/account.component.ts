import {Component, OnInit} from '@angular/core';
import {User} from '../../services/user.service/user';
import {UserApiClient} from '../../api/user/user-api.client';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public account: User;

  constructor(private userApiClient: UserApiClient) {
    this.userApiClient.getCurrentAsync().then((user: User) => {
      this.account = user;
    });
  }

  ngOnInit() {
  }
}
