import {Component, HostListener, OnInit} from '@angular/core';
import {User} from '../../../auth/user';
import {Router} from '@angular/router';
import {Paths} from '../../paths';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'sl-menu',
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

  ngOnInit() {
    this.updateUser(this.authService.getCurrent());
    this.authService.userChanged.subscribe((user) => this.updateUser(user));
  }

  public updateUser(user: User) {
    this.currentUser = user;
    this.isAuthorized = this.authService.isAuthorized;
  }

  logout() {
    this.authService.logout();
  }
}
