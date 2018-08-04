import {Component} from '@angular/core';
import {User} from '../../services/user.service/user';
import {UserService} from '../../services/user.service/user.service';
import {MatDialog} from '@angular/material';
import {EditAccountInfoDialogComponent} from './edit-account-info-dialog/edit-account-info-dialog.component';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent {

  public account: User;

  constructor(private userService: UserService,
              private dialog: MatDialog) {
    this.account = this.userService.getCurrent();
  }

  changeAccountInfo() {
    this.dialog.open(EditAccountInfoDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.account = this.userService.getCurrent();
        }
      }
    );
  }
}
