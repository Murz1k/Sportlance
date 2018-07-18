import {Component, HostListener, OnInit} from '@angular/core';
import {User} from '../../../services/user.service/user';
import {UserInfoStorage} from '../../../core/user-info-storage';
import {Router} from '@angular/router';
import {AccountService} from '../../../services/account-service';
import {Paths} from '../../../core/paths';

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
              private userContext: UserInfoStorage,
              private accountService: AccountService) {
    this.userContext.userInfoChanged.subscribe(async () => await this.updateUserAsync());
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
      this.currentUser = await this.userContext.getCurrentUser();
      this.isAuthorized = true;
    } else {
      this.currentUser = null;
      this.isAuthorized = false;
    }
  }

  login() {
    this.router.navigate([Paths.Login]);
  }

  async registerAsync() {
    await this.router.navigate([Paths.SignUp]);
  }

  navigateToAccount() {
    this.router.navigate([Paths.Account]);
  }

  logout() {
    this.accountService.logout();
    this.router.navigate([Paths.Login]);
  }
}
