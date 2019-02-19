import {Component, Input, OnInit} from '@angular/core';
import {TrainerResponse} from '../../../shared/trainers/responses/trainer-response';
import {AuthService} from '../../../core/auth/auth.service';
import {AddSkillsDialogComponent} from './add-skills-dialog/add-skills-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'sl-trainer-skills-collection',
  templateUrl: './trainer-skills-collection.component.html',
  styleUrls: ['./trainer-skills-collection.component.scss']
})
export class TrainerSkillsCollectionComponent implements OnInit {

  @Input() trainer: TrainerResponse;

  isLoading = false;

  constructor(public authService: AuthService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.authService.setPermissions(`trainer:edit:${this.trainer.id}`, this.authService.isCurrentUser(this.trainer.id));
  }

  showAddSkillsDialog() {
    this.dialog.open(AddSkillsDialogComponent, {data: this.trainer.skills})
      .afterClosed()
      .subscribe((result) => {
          if (result) {
            this.trainer = result;
          }
        }
      );
  }
}
