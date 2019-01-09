import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {EditPasswordDialogComponent} from './edit-password-dialog/edit-password-dialog.component';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'sl-password-and-security',
  templateUrl: './password-and-security.component.html',
  styleUrls: ['./password-and-security.component.scss']
})
export class PasswordAndSecurityComponent implements OnInit {

  constructor(private titleService: Title,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.titleService.setTitle(`Пароль и безопасность | Sportlance`);
  }

  public changePassword() {
    this.dialog.open(EditPasswordDialogComponent)
      .afterClosed()
      .subscribe();
  }
}
