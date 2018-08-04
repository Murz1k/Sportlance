import {Component, OnInit} from '@angular/core';
import {User} from '../../services/user.service/user';
import {UserService} from '../../services/user.service/user.service';
import {TrainerInfo} from '../../trainers/trainers/trainer-info';
import {Paths} from '../../core/paths';
import {MatDialog} from '@angular/material';
import {EditAccountInfoDialogComponent} from './edit-account-info-dialog/edit-account-info-dialog.component';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {

  public account: User;
  public trainer: TrainerInfo;
  public Paths = Paths;

  constructor(private userService: UserService,
              private dialog: MatDialog) {
    this.account = this.userService.getCurrent();
  }

  async ngOnInit() {
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
