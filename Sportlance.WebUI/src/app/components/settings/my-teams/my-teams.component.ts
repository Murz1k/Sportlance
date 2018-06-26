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
  selector: 'app-my-teams',
  templateUrl: './my-teams.component.html',
  styleUrls: ['./my-teams.component.scss']
})
export class MyTeamsComponent implements OnInit {

  public account: User;
  public trainer: TrainerInfo;
  public Paths = Paths;

  constructor(private userService: UserService) {
    this.account = this.userService.getCurrent();
  }

  async ngOnInit() {
  }
}
