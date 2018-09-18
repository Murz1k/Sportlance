import {Component, HostListener, OnInit} from '@angular/core';
import {User} from '../../../services/user.service/user';
import {Router} from '@angular/router';
import {AccountService} from '../../../services/account-service';
import {Paths} from '../../paths';
import {UserService} from '../../../services/user.service/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public isOpen = false;
  public currentUser: User;
  public isAuthorized = false;
  public Paths = Paths;

  constructor(private router: Router,
              private userService: UserService,
              private accountService: AccountService) {
    this.userService.userInfoChanged.subscribe(async () => await this.updateUserAsync());
  }

  @HostListener('document:click', ['$event']) clickedOutside() {
    this.isOpen = false;
  }

  clickedInside($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.isOpen = true;
  }

  async ngOnInit() {
    return await this.updateUserAsync();
  }

  public async updateUserAsync(): Promise<void> {
    if (this.accountService.isAuthorized) {
      this.currentUser = await this.userService.getCurrent();
      this.isAuthorized = true;
    } else {
      this.currentUser = null;
      this.isAuthorized = false;
    }
  }

  logout() {
    this.accountService.logout();
    this.router.navigate([Paths.Login]);
  }
}
