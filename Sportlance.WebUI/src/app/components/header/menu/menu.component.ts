import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from '../../../services/account-service';
import {Paths} from '../../../paths';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router,
              private accountService: AccountService) {
  }

  ngOnInit() {
  }

  navigateToAccount() {
    this.router.navigate([Paths.Account]);
  }

  logout() {
    this.accountService.logout();
    this.router.navigate([Paths.Root]);
  }
}
