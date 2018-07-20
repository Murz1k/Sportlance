import {Component, OnInit} from '@angular/core';
import {User} from '../../services/user.service/user';
import {UserService} from '../../services/user.service/user.service';
import {TrainerInfo} from '../../trainers/trainers/trainer-info';
import {Paths} from '../../core/paths';
import {DialogService} from '../../services/dialog.service';

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
              private dialogService: DialogService) {
    this.account = this.userService.getCurrent();
  }

  async ngOnInit() {
  }

  async changeAccountInfoAsync() {
    const result = await this.dialogService.showEditAccountInfoDialogAsync();
    if (result) {
      this.account = this.userService.getCurrent();
    }
  }
}
