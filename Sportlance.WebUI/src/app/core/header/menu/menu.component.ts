import {Component, HostListener, OnInit} from '@angular/core';
import {User} from '../../../services/user.service/user';
import {Router} from '@angular/router';
import {Paths} from '../../paths';
import {AuthService} from '../../../services/auth/auth.service';

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
              private authService: AuthService) {
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
    if (this.authService.isAuthorized) {
      this.currentUser = await this.authService.getCurrent();
      this.isAuthorized = true;
    } else {
      this.currentUser = null;
      this.isAuthorized = false;
    }
  }

  logout() {
    this.authService.logout();
  }
}
