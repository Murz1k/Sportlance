import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {EditPasswordDialogComponent} from './edit-password-dialog/edit-password-dialog.component';

@Component({
  selector: 'sl-password-and-security',
  templateUrl: './password-and-security.component.html',
  styleUrls: ['./password-and-security.component.scss']
})
export class PasswordAndSecurityComponent {

  constructor(private dialog: MatDialog) {
  }

  public changePassword() {
    this.dialog.open(EditPasswordDialogComponent)
    .afterClosed()
    .subscribe();
  }
}
