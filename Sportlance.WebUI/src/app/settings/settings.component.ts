import {Component} from '@angular/core';
import {User} from '../services/user.service/user';
import {Paths} from '../core/paths';
import {AuthService} from '../services/auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  public account: User;
  public Paths = Paths;

  constructor(private authService: AuthService) {
    this.account = this.authService.getCurrent();
  }
}
