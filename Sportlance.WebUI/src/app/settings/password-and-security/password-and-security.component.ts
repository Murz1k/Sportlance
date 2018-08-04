import {Component, OnInit} from '@angular/core';
import {User} from '../../services/user.service/user';
import {UserService} from '../../services/user.service/user.service';
import {TrainerInfo} from '../../trainers/trainers/trainer-info';
import {Paths} from '../../core/paths';
import {MatDialog} from '@angular/material';
import {EditPasswordDialogComponent} from './edit-password-dialog/edit-password-dialog.component';

@Component({
  selector: 'app-password-and-security',
  templateUrl: './password-and-security.component.html',
  styleUrls: ['./password-and-security.component.scss']
})
export class PasswordAndSecurityComponent implements OnInit {

  public account: User;
  public trainer: TrainerInfo;
  public Paths = Paths;

  constructor(private userService: UserService,
              private dialog: MatDialog) {
    this.account = this.userService.getCurrent();
  }

  async ngOnInit() {
  }

  public changePasswordAsync() {
    this.dialog.open(EditPasswordDialogComponent)
    .afterClosed()
    .subscribe();
  }
}
