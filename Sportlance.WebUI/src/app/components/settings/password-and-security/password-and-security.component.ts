import {Component, OnInit} from '@angular/core';
import {User} from '../../../services/user.service/user';
import {UserService} from '../../../services/user.service/user.service';
import {TrainerInfo} from '../../trainers/trainer-info';
import {TrainersService} from '../../../services/trainers/trainers.service';
import {Star} from '../../trainers/star';
import {ReviewInfo} from '../../profile/review-info';
import {TrainerStatus} from '../../../services/trainers/trainer-status';
import {MatCheckboxChange} from '@angular/material';
import {Paths} from '../../../core/paths';
import {DialogService} from '../../../services/dialog.service';
import {isNullOrUndefined} from 'util';

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
              private dialogService: DialogService) {
    this.account = this.userService.getCurrent();
  }

  async ngOnInit() {
  }

  public async changePasswordAsync() {
    await this.dialogService.showEditPasswordDialogAsync();
  }
}
