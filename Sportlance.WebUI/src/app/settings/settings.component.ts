import {Component} from '@angular/core';
import {User} from '../services/user.service/user';
import {UserService} from '../services/user.service/user.service';
import {TrainerInfo} from '../trainers/trainers/trainer-info';
import {Paths} from '../core/paths';
import {SettingsLinks} from './settings-links';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  public account: User;
  public trainer: TrainerInfo;
  public Paths = Paths;
  public SettingsLinks = SettingsLinks;
  public activeLink = SettingsLinks.ContactInfo;

  constructor(private userService: UserService) {
    this.account = this.userService.getCurrent();
  }

  public changePage(link: SettingsLinks) {
    this.activeLink = link;
  }
}
