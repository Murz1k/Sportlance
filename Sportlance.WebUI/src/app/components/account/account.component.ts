import {Component, OnInit} from '@angular/core';
import {User} from '../../services/user.service/user';
import {UserService} from '../../services/user.service/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public account: User;

  constructor(private userService: UserService) {
    this.account = this.userService.getCurrent();
  }

  ngOnInit() {
  }
}
