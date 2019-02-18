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

  tempSkills = [];
  isLoading = false;

  constructor(public authService: AuthService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.tempSkills = [
      'Плавание',
      'Кикбоксинг',
      'Качалка',
      'Восстановление',
      'Тренировки',
      'Борьба',
      'Айкидо',
      'Карате',
      'Вольная стрельба',
      'Баскетбол',
      'Волейбол',
      'Плавание',
      'Плавание',
      'Плавание',
      'Плавание',
      'Плавание'
    ];
    this.authService.setPermissions(`trainer:edit:${this.trainer.id}`, this.authService.isCurrentUser(this.trainer.id));
  }

  showAddSkillsDialog() {
    this.dialog.open(AddSkillsDialogComponent, {data: this.tempSkills})
      .afterClosed()
      .subscribe((result) => {
          if (result) {
            this.tempSkills = result;
            this.trainer.skills = result;
          }
        }
      );
  }
}
