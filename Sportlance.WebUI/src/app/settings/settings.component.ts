import {Component} from '@angular/core';
import {User} from '../auth/user';
import {Paths} from '../core/paths';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'sl-settings',
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
