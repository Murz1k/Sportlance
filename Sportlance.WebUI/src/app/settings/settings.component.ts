import {Component} from '@angular/core';
import {User} from '../services/user.service/user';
import {UserService} from '../services/user.service/user.service';
import {Paths} from '../core/paths';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  public account: User;
  public Paths = Paths;

  constructor(private userService: UserService) {
    this.account = this.userService.getCurrent();
  }
}
