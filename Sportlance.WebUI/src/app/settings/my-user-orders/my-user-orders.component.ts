import {Component, OnInit} from '@angular/core';
import {User} from '../../core/auth/user';
import {MatDialog} from '@angular/material';
import {EditAccountInfoDialogComponent} from './edit-account-info-dialog/edit-account-info-dialog.component';
import {AuthService} from '../../core/auth/auth.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'sl-contact-info',
  templateUrl: './my-user-orders.component.html',
  styleUrls: ['./my-user-orders.component.scss']
})
export class MyUserOrdersComponent implements OnInit{

  public account: User;

  constructor(private authService: AuthService,
              private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle(`Контактная информация | Sportlance`);
    this.account = this.authService.getCurrent();
  }
}
