import {Component} from '@angular/core';
import {User} from '../../services/user.service/user';
import {MatDialog} from '@angular/material';
import {EditAccountInfoDialogComponent} from './edit-account-info-dialog/edit-account-info-dialog.component';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent {

  public account: User;

  constructor(private authService: AuthService,
              private dialog: MatDialog) {
    this.account = this.authService.getCurrent();
  }

  changeAccountInfo() {
    this.dialog.open(EditAccountInfoDialogComponent)
      .beforeClose()
      .subscribe((result) => {
        if (result) {
          this.account = this.authService.getCurrent();
        }
      }
    );
  }
}
